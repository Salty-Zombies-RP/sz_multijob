# Job Swapping App for LB Phone

This is a Qbox FiveM server application designed to integrate seamlessly with the `lb-phone` resource. It provides an Employment app on your phone, enabling players to swap jobs directly from their in-game device.

## Features

- **Integrated with `lb-phone`**: Adds a new Employment app to the phone UI.
- **In-Game Job Swapping**: Allows players to switch jobs conveniently without external commands or menus.
- **Interactive and User-Friendly**: Offers a simple and effective interface for job changes.
- **Qbox Compatibility**: Fully optimized for use on Qbox-based FiveM servers.

---

## Installation

Before installing, ensure you have the following prerequisites:

### Prerequisites:
1. A **Qbox FiveM server** running properly.
2. The **`lb-phone` resource** already installed and configured on the server.
3. **Node.js** installed on your development system (if you plan to make changes to the UI).

### Downloads:
- You can clone this repository:
  ```bash
  git clone https://github.com/Salty-Zombies-RP/sz_multijob.git
  ```
- You can download just the release from [Latest Release](https://github.com/Salty-Zombies-RP/sz_multijob/releases/latest)

### Steps:
1. Clone or download this resource and place it in your server's resource directory:
   ```bash
   /resources/[phone-apps]/sz_multijob
   ```

3. Add the resource to your server's `server.cfg`:

   ```cfg
   ensure sz_multijob
   ```

4. Ensure your `lb-phone` resource is up-to-date and properly functioning.

5. Start the server and test the functionality by accessing the Employment app on the in-game phone.

---

## Developing & Building the UI

This resource includes a front-end React app built with Vite. To make changes or rebuild the app:

1. Navigate to the `ui` folder inside the resource:

   ```bash
   cd ui
   ```

2. Install all necessary dependencies:

   ```bash
   npm install
   ```

3. For development, run the app locally:

   ```bash
   npm run dev
   ```

   This will start a local development server at [http://localhost:3000](http://localhost:3000). You can view and test your changes there.

4. Once your changes are finalized, build the app for production:

   ```bash
   npm run build
   ```

5. Copy the contents of the `dist` folder to the appropriate directory in `sz_multijob to update the resource.

---

## Credits

This resource is based on the work by **Solareon** with [slrn_multijob](https://github.com/solareon/slrn_multijob). Their foundational code and ideas have been adapted, expanded, and polished into this finalized application.

---

## Notes

- This resource is designed specifically for Qbox setups and may require adjustments if used with other FiveM builds.
- Always backup your server before making changes to installed resources.

---

For support or further inquiries, feel free to contact the maintainers or contribute to this repository.
