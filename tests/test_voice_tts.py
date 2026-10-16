import os
import unittest
from unittest.mock import patch

from fastapi import HTTPException

import main
import voice_tts


class FakeTTSClient:
    def __init__(self) -> None:
        self.requests = []

    def synthesize_speech(self, **request):
        self.requests.append(request)
        return type("TTSResponse", (), {"audio_content": b"fake-mp3-audio"})()


class HindiTTSServiceTests(unittest.TestCase):
    def setUp(self) -> None:
        voice_tts._synthesize_cached.cache_clear()

    def tearDown(self) -> None:
        voice_tts._synthesize_cached.cache_clear()

    def test_disabled_service_fails_explicitly(self) -> None:
        with patch.dict(os.environ, {"JAL_RAKSHA_TTS_ENABLED": "false"}, clear=True):
            with self.assertRaises(voice_tts.VoiceTTSConfigurationError):
                voice_tts.synthesize_hindi_audio("नमस्ते", 0.85)

    def test_configured_hindi_voice_returns_cached_mp3(self) -> None:
        client = FakeTTSClient()
        env = {
            "JAL_RAKSHA_TTS_ENABLED": "true",
            "JAL_RAKSHA_HINDI_TTS_VOICE": "hi-IN-Neural2-A",
        }
        with patch.dict(os.environ, env, clear=True):
            with patch.object(voice_tts.texttospeech, "TextToSpeechClient", return_value=client) as factory:
                first = voice_tts.synthesize_hindi_audio("केंद्र की स्थिति ठीक है।", 0.85)
                second = voice_tts.synthesize_hindi_audio("केंद्र की स्थिति ठीक है।", 0.85)

        self.assertEqual(first, b"fake-mp3-audio")
        self.assertEqual(second, first)
        factory.assert_called_once_with()
        self.assertEqual(len(client.requests), 1)
        request = client.requests[0]
        self.assertEqual(request["voice"].language_code, "hi-IN")
        self.assertEqual(request["voice"].name, "hi-IN-Neural2-A")
        self.assertEqual(request["input"].text, "केंद्र की स्थिति ठीक है।")
        self.assertEqual(request["audio_config"].speaking_rate, 0.85)
        self.assertEqual(
            request["audio_config"].audio_encoding,
            voice_tts.texttospeech.AudioEncoding.MP3,
        )
        self.assertEqual(request["timeout"], 20)

    def test_non_hindi_voice_configuration_is_rejected(self) -> None:
        env = {
            "JAL_RAKSHA_TTS_ENABLED": "true",
            "JAL_RAKSHA_HINDI_TTS_VOICE": "en-US-Neural2-A",
        }
        with patch.dict(os.environ, env, clear=True):
            with self.assertRaises(voice_tts.VoiceTTSConfigurationError):
                voice_tts.synthesize_hindi_audio("नमस्ते", 0.85)


class HindiTTSEndpointTests(unittest.TestCase):
    def test_disabled_endpoint_returns_configuration_error(self) -> None:
        with patch.object(main, "is_hindi_tts_enabled", return_value=False):
            with self.assertRaises(HTTPException) as error:
                main.synthesize_hindi(main.HindiSpeechPayload(text="नमस्ते"))

        self.assertEqual(error.exception.status_code, 503)

    def test_enabled_endpoint_returns_mp3_response(self) -> None:
        with patch.object(main, "is_hindi_tts_enabled", return_value=True):
            with patch.object(main, "synthesize_hindi_audio", return_value=b"fake-mp3-audio") as synthesize:
                response = main.synthesize_hindi(
                    main.HindiSpeechPayload(text="  केंद्र की स्थिति ठीक है।  ", speaking_rate=1)
                )

        self.assertEqual(response.media_type, "audio/mpeg")
        self.assertEqual(response.body, b"fake-mp3-audio")
        synthesize.assert_called_once_with("केंद्र की स्थिति ठीक है।", 1)

    def test_request_rejects_blank_and_oversized_text(self) -> None:
        with self.assertRaises(ValueError):
            main.HindiSpeechPayload(text="   ")
        with self.assertRaises(ValueError):
            main.HindiSpeechPayload(text="ह" * 1501)


if __name__ == "__main__":
    unittest.main()
