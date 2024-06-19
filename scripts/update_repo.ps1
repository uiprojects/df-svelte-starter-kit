# Ensure script stops on any errors
$ErrorActionPreference = "Stop"
 
# Define the path to your Svelte application
$repoPath = "D:\Murugesan\df-starter-kit\df-svelte-starter-kit"
 
# Navigate to the repository path
Set-Location -Path $repoPath
 
# Fetch the latest changes
git fetch origin main
 
# Try to merge
try {
    git merge origin/main --strategy-option theirs
    Write-Output "Merge successful!"
} catch {
    Write-Output "Merge conflicts detected. Attempting to resolve..."
    
    # Check for unmerged files
    $unmergedFiles = git status --porcelain | Select-String -Pattern "UU"
 
    if ($unmergedFiles) {
        Write-Output "Unmerged files detected. Attempting automatic conflict resolution..."
        
        # Resolve conflicts by using incoming changes
        git ls-files -u | ForEach-Object {
            $file = $_.Split("`t")[1]
            Write-Output "Resolving conflict in $file by using incoming changes..."
            git checkout --theirs $file
            git add $file
        }
 
        # Commit the resolved conflicts
        git commit -m "Resolved conflicts by preferring incoming changes from main"
        Write-Output "Conflicts resolved and committed."
    } else {
        Write-Output "No unmerged files detected, proceeding with hard reset."
        git reset --hard origin/main
    }
}
 
# Final confirmation of the merge status
Write-Output "Update process completed."