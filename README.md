This project demonstrates memory leak in react-native `fetch` api, keeping all fetch responses in memory indefinitely.

When app is started, fetch requests are continously triggered, collecting only resulting `blob` info on each response.

If button *Read previously fetched result* is clicked, **ALL previously issued fetch responses** are reread with `FileReader`, demonstrating that blobs were never released.
