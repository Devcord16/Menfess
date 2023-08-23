// Copas dikit ga ngaruh
const imagekit = require("../tools/imagekit.js")
const postModel = require("../models/post.js")

const postController = {
  // Func buat createPost
  createPost: async (req, res) => {
    // Ambil semua yg diperlukan dari obj req
    const file = req.file;

    try {
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Terjadi kesalahan" })
    }
  },

  // Yg ini buat ngambil banyak post makanya namanya getPosts
  getPosts: (req, res) => {
    // Query itu yg di url setelah tanda tanya (?)
    const search = req.query.search;
    const from = req.query.from;
    const to = req.query.to;

    // Kalo ada query search kita cari postingan berdasarkan query yg dikirim
    if (search) {
      postModel
        .find({
          $or: [
            {
              content: { $regex: search, $options: "i" },
            },
          ],
        })
        .lean()
        .then((posts) => res.json({ posts }))
        .catch((err) => {
          res.status(500).json({ msg: "cannot find post" });
          console.log(err);
        });

    // Kalo adanya query form ama to kita ambil data berdasarkan query tersebut
    } else if (from && to) {
      const posts = data.slice(from, to)
      if(!posts || posts === []) return res.status(404).json({ msg: "postingan tidak ditemukan" })
      res.json({ posts })

    // Kalo ga ya return aja semua
    } else {
      res.json({ posts: data });
    }
  },

  // Yg ini cuman ngambil 1 post berdasarkan id yg dikirim di url
  getPost: (req, res) => {
    const post = data.find(({ noteId }) => noteId == req.params.id)
    if(!post) return res.status(404).json({ msg: "postingan tidak ditemukan" })
    res.json({ post });
  },

  // Yg ini buat nanganin like
  like: (req, res) => {
    // Cari postingan yg mau di-like
    const itemIndex = data.findIndex(
      ({ noteId }) => noteId == req.params.id
    );

    // Kalo postingan nya ga ada return
    if (itemIndex == -1) return res.status(404).json({ msg: "post not found" });

    // Cari postingan nya di db habis itu tambah like nya
    postModel
      .findOneAndUpdate({ noteId: req.params.id }, { $inc: { like: 1 } })
      .then(() => {
        // Ambil postingan dari data, tambah like nya, terus taruh postingan nya di awal data
        const post = data.splice(itemIndex, 1)[0];
        post.like++;
        data.unshift(post);

        // Kirim emit ke client biar real-time terus sendStatus biar berenti lah jir
        req.io.emit("addLike", type, req.params.id)
        res.sendStatus(200);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ msg: "cannot update database" });
      });
  },

  // Yg ini buat ngepost comment
  comment: (req, res) => {
    const commentContent = req.body.content;
    const commenterName = req.body.name;
    const noteIdPost = parseInt(req.params.id.trim());
    const commentId = data.length + 50;

    // Kalo nama atau content nya ada yang kosong return
    if (!commentContent || !commenterName || commentContent.trim() === "" || commenterName.trim() === "")
      return res
        .status(400)
        .json({ msg: "nama dan content tidak boleh kosong" });

    // Cari postingan yg mau ditambah comment
    const itemIndex = data.findIndex(
      ({ noteId }) => noteId == noteIdPost
    );

    // Kalo postingan nya ga ada return
    if (itemIndex == -1) return res.status(404).json({ msg: "post not found" });

    // Jadiin obj dulu biar gampang entar
    const comment = { commentContent, commentId, commenterName }

    // Cari postingan nya di db habis itu push comment nya
    postModel
      .findOneAndUpdate(
        { noteId: noteIdPost },
        {
          $push: { comment },
        }
      )
      .then(() => {
        // Ambil postingan dari data, masukin comment nya, terus taruh postingan nya di awal data
        const post = data.splice(itemIndex, 1)[0];
        post.comment.push(comment);
        data.unshift(post);

        // Kirim emit ke client biar real-time terus sendStatus biar berenti lah jir
        req.io.emit("newComment", type, noteIdPost, comment)
        res.sendStatus(200);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ msg: "cannot update database" });
      });
  }
}

// Terakhir export class ny
module.exports = gtw;
