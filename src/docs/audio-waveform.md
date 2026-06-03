## Audio waveform generation

- https://github.com/bbc/audiowaveform?tab=readme-ov-file#installation

To generate peaks of an audio waveform, you need to:

1. install podman - https://podman.io/
2. move to working directory where the wav/mp3 mix exists and run the following:

```
podman run --rm -v "%CD%:/tmp" -w /tmp docker.io/realies/audiowaveform -i [FILENAME_HERE].wav -o waveform.json --pixels-per-second 20
```
