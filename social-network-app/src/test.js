
const axios = require('axios');

/*axios.get(`http://localhost:3002/get/transactions?address=GDOU3TTWZ4BEQCUK5QTJ2WNFFN5S3JEUJOO7GA6SJJ5BVJWUAROCZISN`)
            .then(res => {
                console.log(res.data);
                var posts = [];
                res.data.forEach(simpleTxInfo => {
                    var post = {
                        id: simpleTxInfo.tx_hash,
                        type: simpleTxInfo.type,
                        content: simpleTxInfo.content.toString(),
                        content_type: simpleTxInfo.content_type,
                        from: simpleTxInfo.from,
                        sequence: simpleTxInfo.sequence,
                        avatar: '',
                        username: '',
                        heart: '',
                        comment: '',
                        share: '',
                    };
                    posts.push(post);
                })
                console.log(posts);
            });*/

            axios.get(`localhost:3002/get/current_user_info?address=GDLLXAEH3MYZ3IYEE4JNVYPXXQDA5HY6JMVLU7UFNZJVY7CDVCURFED3`)
            .then(res => {
                console.log(res.data);
            });