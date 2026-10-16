from __future__ import annotations

import os
from functools import lru_cache

from google.api_core.exceptions import GoogleAPIError
from google.auth.exceptions import GoogleAuthError
from google.cloud import texttospeech


class VoiceTTSConfigurationError(Exception):
    pass


class VoiceTTSError(Exception):
    pass


def is_hindi_tts_enabled() -> bool:
    return os.getenv("JAL_RAKSHA_TTS_ENABLED", "false").strip().lower() in {"1", "true", "yes"}


def synthesize_hindi_audio(text: str, speaking_rate: float) -> bytes:
    if not is_hindi_tts_enabled():
        raise VoiceTTSConfigurationError("Hindi cloud speech is disabled.")

    voice_name = os.getenv("JAL_RAKSHA_HINDI_TTS_VOICE", "hi-IN-Neural2-A").strip()
    if not voice_name.startswith("hi-IN-"):
        raise VoiceTTSConfigurationError("The configured Google Cloud voice must support hi-IN.")

    return _synthesize_cached(text, voice_name, speaking_rate)


@lru_cache(maxsize=64)
def _synthesize_cached(text: str, voice_name: str, speaking_rate: float) -> bytes:
    try:
        client = texttospeech.TextToSpeechClient()
        response = client.synthesize_speech(
            input=texttospeech.SynthesisInput(text=text),
            voice=texttospeech.VoiceSelectionParams(
                language_code="hi-IN",
                name=voice_name,
            ),
            audio_config=texttospeech.AudioConfig(
                audio_encoding=texttospeech.AudioEncoding.MP3,
                speaking_rate=speaking_rate,
            ),
            timeout=20,
        )
    except GoogleAuthError as error:
        raise VoiceTTSConfigurationError(
            "Google Cloud Application Default Credentials are missing or invalid."
        ) from error
    except GoogleAPIError as error:
        raise VoiceTTSError("Google Cloud Text-to-Speech could not synthesize the audio.") from error

    if not response.audio_content:
        raise VoiceTTSError("Google Cloud Text-to-Speech returned empty audio.")
    return bytes(response.audio_content)
