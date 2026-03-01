## Creating an alias in Powershell

Need to add a function to the profile file. CHeck if it exists: `Test-Path $PROFILE`  
If it returns False, create it with: `New-Item -Path $PROFILE -ItemType File -Force`

Open the profile in your editor: `notepad $PROFILE`

Add the function at the end of the file:

```
function awf {
    podman run --rm -v "${PWD}:/tmp" -w /tmp realies/audiowaveform @Args
}
```

Save and close Notepad then either reload the profile or restart PowerShell.
