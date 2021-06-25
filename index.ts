import express from "express";
import fs from "fs";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function randomID(length: number) {
    let alphabet = 'qweMIKOLP123rtyuiopaQAZWSXEDCRFVsdfghjklzxcvbnmTGBYHNUJ4567890'.split('');
    let result = '';

    for (let i = 0; i < length; i++) {
        result += alphabet[Math.floor(Math.random() * alphabet.length)];
    }

    return result;
}

app.post('/api/shorten', (req, res) => {
    if (req.body.link) {
        const links = JSON.parse(fs.readFileSync('./data/links.json', 'utf8'));
        const short = randomID(6);

        const newLink = {
            originalLink: req.body.link,
            short
        }

        links.push(newLink)

        fs.writeFileSync('./data/links.json', JSON.stringify(links));
        res.redirect('/');
    }
});

app.get('/:shortLink', (req, res) => {
    const links = JSON.parse(fs.readFileSync('./data/links.json', 'utf8'));

    if (links.some((link: any) => link.short === req.params.shortLink)) {
        res.redirect(links.filter((link: any) => link.short === req.params.shortLink)[0].originalLink);
    } else {
        res.status(404).json({
            status: 404,
            message: "Link not found."
        })
    }
});

app.get('/api/links', (req, res) => {
    res.json(JSON.parse(fs.readFileSync('./data/links.json', 'utf8')));
});

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});