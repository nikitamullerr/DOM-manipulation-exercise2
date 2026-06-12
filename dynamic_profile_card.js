(function() {
    // getting dom elements
    const profileCard = document.getElementById('profileCard');
    const profileName = document.getElementById('profileName');
    const profileRole = document.getElementById('profileRole');
    const updateNameBtn = document.getElementById('updateNameBtn');
    const updateRoleBtn = document.getElementById('updateRoleBtn');
    const toggleStatusBtn = document.getElementById('toggleStatusBtn');
    const profileImage = document.getElementById('profileImage');
    const changeImageBtn = document.getElementById('changeImageBtn');

    // -update name
    // listen for click on "Update Name" button -> prompt user and update textContent
    updateNameBtn.addEventListener('click', () => {
      const newName = prompt(' Enter new name:', profileName.textContent);
      // Only update if user provides a non-empty value (cancel returns null)
      if (newName !== null && newName.trim() !== '') {
        profileName.textContent = newName.trim();
      } else if (newName !== null && newName.trim() === '') {
        // optional gentle feedback: if empty string typed, do nothing to avoid blank name
        alert('Name cannot be empty. Please type a valid name.');
      }
    });

    // update role
    // same pattern for role button
    updateRoleBtn.addEventListener('click', () => {
      const newRole = prompt(' Enter new role / title:', profileRole.textContent);
      if (newRole !== null && newRole.trim() !== '') {
        profileRole.textContent = newRole.trim();
      } else if (newRole !== null && newRole.trim() === '') {
        alert('Role cannot be empty. Please provide a role.');
      }
    });

    // toggle activity status
    toggleStatusBtn.addEventListener('click', () => {
      profileCard.classList.toggle('active-status');
      
      if (profileCard.classList.contains('active-status')) {
        // small hint but not intrusive - you can ignore, but keeps UX friendly
        toggleStatusBtn.style.transform = 'scale(0.98)';
        setTimeout(() => { toggleStatusBtn.style.transform = ''; }, 120);
      } else {
        toggleStatusBtn.style.transform = 'scale(0.98)';
        setTimeout(() => { toggleStatusBtn.style.transform = ''; }, 120);
      }
    });

    // bonus task
    // When clicked -> prompt user for a new image URL, then update src attribute of #profileImage
    changeImageBtn.addEventListener('click', () => {
      const newImageUrl = prompt(' Enter new image URL (absolute or relative):', profileImage.src);
      if (newImageUrl !== null && newImageUrl.trim() !== '') {
        // update src attribute of the profile image
        profileImage.src = newImageUrl.trim();
        // optional: handle potential broken images by providing a fallback inside onerror
        // but we also predefine an onerror safety for the new image load failure
        // (prevents empty broken icon)
        profileImage.onerror = function() {
          // if the provided URL fails to load, show a neat placeholder
          this.onerror = null; // avoid infinite loop
          this.src = 'https://placehold.co/100x100';
          // Notify user (gentle)
          console.warn('Image failed to load, using fallback.');
          alert(' The image URL could not be loaded. Using fallback placeholder.');
        };
      } else if (newImageUrl !== null && newImageUrl.trim() === '') {
        alert('Please enter a valid image URL (cannot be empty).');
      }
      // If user cancels (null), do nothing
    });
    
    // Precaution: ensure that initial profile image has a backup onerror handler already
    if (profileImage.complete) {
      if (profileImage.naturalWidth === 0) {
        profileImage.src = 'https://placehold.co/100x100';
      }
    }
    profileImage.onerror = function() {
      this.onerror = null;
      this.src = 'https://placehold.co/100x100';
    };
  })();