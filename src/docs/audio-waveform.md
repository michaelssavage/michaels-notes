## Audio waveform generation

- https://github.com/bbc/audiowaveform?tab=readme-ov-file#installation

To generate peaks of an audio waveform, you need to:

1. install podman - https://podman.io/
2. create an alias in powershell / cmd / zshrc
3. move to working directory where the wav/mp3 mix exists and run the following:

```
awf -i [FILENAME_HERE] -o waveform.json --pixels-per-second 20
```
