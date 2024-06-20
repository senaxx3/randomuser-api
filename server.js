const express = require('express');
const fetch = require('node-fetch');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('MongoDB bağlantısı başarılı!');
  } catch (error) {
    console.error('MongoDB bağlantısı hatası:', error);
  }
}

connectToMongoDB();

app.get('/fetch-and-save', async (req, res) => {
  try {
    const apiUrl = 'https://randomuser.me/api/';
    const response = await fetch(apiUrl);
    const data = await response.json();
    const user = data.results[0];

    // MongoDB'ye yazılacak veri
    const kullaniciDocument = {
      name: `${kullanici.name.first} ${kullanici.name.last}`,
      email: kullanici.email,
      phone: kullanici.phone,
      country: kullanici.location.country,
    };

    const database = client.db('testdb');
    const collection = database.collection('users');

    const result = await collection.insertOne(userDocument);
    console.log('Veri eklendi:', result.insertedId);

    res.send('Veri MongoDB\'ye başarıyla eklendi');
  } catch (error) {
    console.error('API veya veri ekleme hatası:', error);
    res.status(500).send('Veri eklenirken bir hata oluştu');
  }
});

app.listen(port, () => {
  console.log(`Sunucu http://localhost:${port} adresinde çalışıyor`);
});
