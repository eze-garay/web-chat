import * as messageServicies from "../services/messageServices.js"

export async function handleGetRecentMessages(req, res) {
  messageServicies.then(messages => {
    res.json(messages);
  }).catch(err => {
    console.log(err);
    res.status(500).json({ error: 'Error al obtener los mensajes recientes.' });
  });
}

export async function handleSaveMessage(req, res) {
  const { content, sender } = req.body;
  messageServicies(content, sender).then(message => {
    res.json(message);
  }).catch(err => {
    console.log(err);
    res.status(500).json({ error: 'Error al guardar el mensaje.' });
  });
}

