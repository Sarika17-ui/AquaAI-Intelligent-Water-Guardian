# Voice Guide speech setup

The website first uses an installed browser voice whose language is Hindi (`hi-IN` or another `hi-*` tag). If the browser has no Hindi voice, it requests MP3 speech from the backend. English continues to use the browser's installed English voice and does not depend on Google Cloud.

## Configure Google Cloud Text-to-Speech

1. Install the Python dependencies from the project root:

   ```powershell
   .\.venv-1\Scripts\python.exe -m pip install -r requirements.txt
   ```

2. In a Google Cloud project, enable the Cloud Text-to-Speech API and configure billing and an identity with permission to use the API. Google's client libraries use Application Default Credentials (ADC). For local development, install the Google Cloud CLI and run:

   ```powershell
   gcloud services enable texttospeech.googleapis.com --project YOUR_PROJECT_ID
   gcloud auth application-default login
   ```

   On a hosted backend, prefer an attached service account or workload identity. If using a credential configuration file, store it outside this project and set `GOOGLE_APPLICATION_CREDENTIALS` to its path. Do not put credential JSON, API keys, or service-account secrets in the frontend or source control.

3. Copy the example environment file and enable the fallback:

   ```powershell
   Copy-Item .env.example .env
   ```

   Edit `.env`: set `JAL_RAKSHA_TTS_ENABLED=true`, `GOOGLE_CLOUD_PROJECT` to your project ID, and set `GOOGLE_APPLICATION_CREDENTIALS` only if you are using a credential file. The default voice `hi-IN-Neural2-A` is a Google Cloud voice explicitly listed for Hindi (India) in the [supported voices catalogue](https://cloud.google.com/text-to-speech/docs/voices); change it only to another currently supported `hi-IN-*` voice.

4. Start the FastAPI app, which serves both the website and `/api/voice/hindi` on the same origin:

   ```powershell
   .\.venv-1\Scripts\python.exe -m uvicorn main:app --reload --port 8001
   ```

   Open `http://127.0.0.1:8001`. The backend returns MP3 audio; generated audio is cached in a bounded in-memory cache (up to 64 distinct text/voice pairs), not written to disk. A backend restart clears this cache.

   If the frontend is hosted on a different origin, set the `jal-raksha-api-base` meta tag in `index.html` to the backend origin (for example, `https://api.example.com`). The backend's CORS policy must then be restricted to the actual frontend origin before public deployment.

## Billing, limits, and privacy

Google Cloud Text-to-Speech is a metered cloud service and the Google Cloud project must have billing enabled. Applicable free usage, voice-family rates, and regional terms can change, so review the current [Text-to-Speech pricing](https://cloud.google.com/text-to-speech/pricing) before enabling it. Google's current synchronous request content limit is 5,000 bytes; this endpoint uses a more conservative 4,500-byte limit. Request quotas are project-specific and subject to change; review Google's [quota documentation](https://cloud.google.com/text-to-speech/quotas). Set a project budget and usage alerts. The endpoint's text limit is not a substitute for authentication and rate limiting before exposing the backend publicly.

When cloud fallback is used, the selected narration text (which may contain current sensor or alert details) is sent to Google to synthesize speech. Keep the service disabled if that transfer is not acceptable. Configuration or network failures are shown in the Voice Guide with a Retry button; English browser speech remains available.

## Android project status

This workspace currently contains the website and FastAPI backend only; it has no Android source, Gradle project, manifest, or Kotlin/Java application. An Android-native client can call the same `/api/voice/hindi` endpoint and use this backend configuration, but no Android app was created or replaced with a WebView.
