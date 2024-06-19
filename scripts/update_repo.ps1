# Ensure script stops on any errors
$ErrorActionPreference = "Stop"
 
# Define the path to your Svelte application
$repoPath = "D:\Murugesan\df-starter-kit\df-svelte-starter-kit"
 
# Navigate to the repository path
Set-Location -Path $repoPath
 
# Pull the latest changes from the 'Main' branch
git pull origin main