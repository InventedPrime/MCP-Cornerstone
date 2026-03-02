const admin = require('firebase-admin');
const axios = require('axios');
const serviceAccount = require('./serviceAccount.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://mcp-project-471a6-default-rtdb.firebaseio.com/'
});

const db = admin.database();
const userId = process.argv[2] || 'u7p9RRFaLaMia3Yu42gm3YjVS5G2';

async function getLikedArtworks() {
  console.log('Fetching liked posts for user:', userId);
  const snapshot = await db.ref('users/' + userId + '/likedPosts').get();
  
  if (snapshot.exists() === false) {
    console.log('No liked artworks found');
    return;
  }

  const likedIds = Object.keys(snapshot.val());
  console.log('Found', likedIds.length, 'liked artworks:', likedIds);

  // Fetch first 3 artworks to test
  const artworks = await Promise.all(
    likedIds.slice(0, 3).map(async (id) => {
      try {
        const response = await axios.get(
          'https://api.artic.edu/api/v1/artworks/' + id + '?fields=id,title,artist_display,date_display,image_id'
        );
        const data = response.data.data;
        if (data.image_id) {
          data.image_url = 'https://www.artic.edu/iiif/2/' + data.image_id + '/full/843,/0/default.jpg';
        }
        return data;
      } catch (err) {
        return { id, error: err.message };
      }
    })
  );

  console.log('\nArtwork details:');
  console.log(JSON.stringify(artworks, null, 2));
}

getLikedArtworks().then(() => process.exit(0)).catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
