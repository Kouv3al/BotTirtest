const Discord = require('discord.js');
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const express = require('express');
const app = express();

const adapters = new FileSync('database.json');
const shopadapter = new FileSync('shop.json');
const db = low(adapters);
const shopdb = low(shopadapter);

db.defaults({ histoires: [], xp: []})
    .write()

app.set('port', (process.env.port || 5000 ))

app.listen(app.get('port'), function(){
    console.log(`Bot en fonctionnement sur le port ${app.get('port')}`);
})

var bot = new Discord.Client();
var prefix = ("/")

var storynumber = db.get('histoires').map('story_value').value();

bot.on('ready',() => {
    bot.user.setPresence({ game: { name: '[/HELP] BotTir', type: 0}});
    console.log('Bot Ready');
});

bot.login('NDQ0NTM2Mjk2NzcwMjQwNTE1.DddWOw.lZPRn1NSY7Vz_RDvVpGiW8LofZQ');

bot.on("guildMemberAdd", member => {
    let role = member.guild.roles.find("name", "Membre")
    member.guild.channels.find("name", "bienvenue").send(`:pizza: ${member.user.username} vien de rejoindre le serveur j'espère que tu as emmener de la pizza`)
    member.addRole(role)
})

bot.on('message', message =>{

    var msgauthor = message.author.id;

    if(message.author.bot)return;

    if(!db.get("xp").find({user: msgauthor}).value()){
        db.get("xp").push({user: msgauthor, xp: 1}).write();
    }else{
        var userxpdb = db.get("xp").filter({user: msgauthor}).find('xp').value();
        console.log(userxpdb);
        var userxp = Object.values(userxpdb)
        console.log(userxp);
        console.log(`Nombre d'xp : ${userxp[1]}`)

        db.get("xp").find({user: msgauthor}).assign({user: msgauthor, xp: userxp[1] += 1}).write();
    }

    if (message.content === prefix + "xpstat"){
        var xp = db.get("xp").filter({user: msgauthor}).find('xp').value()
        var xpfinal = Object.values(xp);
        var xp_embed = new Discord.RichEmbed()
            .setColor('#FFA400')
            .setTitle(`XP de ${message.author.username}`)
            .setDescription("Voici votre XP !")
            .addField("XP :", `${xpfinal[1]} xp`)
        message.channel.send({embed: xp_embed});
    }

    if (message.content === "ping"){
        message.reply("pong");
        console.log('ping pong')
    }

    if (message.content === "Luke"){
        message.reply("Je suis ton père")
        console.log('Luke')
    }

    if (message.content === prefix + "help"){
        var help_embed = new Discord.RichEmbed()
            .setColor('#FFA400')
            .setTitle('Commandes utiles')
            .addField("/help", "Affiche les commandes")
            .addField("/helpf", "Affiche les commandes fun")
            .addField("/party", "Affiche le nom des gens qui sont sur le serveur")
            .addField("/card + Prénom d'une personne", "Donne la fiche info sur la personne")
            .setFooter("Ex : /cardaurore")
            .addField("/xpstat", "Donne votre nombre d'XP")
            .setFooter("Le nombre d'XP augmente de 1 à chaque message envoyé")

        message.channel.sendEmbed(help_embed)
        //message.channel.sendMessage("Voici les commandes du BOT :\n -/help pour afficher les commandes");
        console.log("Commande help demandée !");
    }

    if (message.content === prefix + "party"){
        var puissance_embed = new Discord.RichEmbed()
            .setColor('#FFA400')
            .setDescription("**Aurore** Audrain Fournier\n**Alix** Deunieau\n**Benjamin** Merlet\n**Morgane** David\n**Théo** Lacambra\n**Mickaël** Eisenbeth")
        message.channel.sendEmbed(puissance_embed)
        console.log("Commande puissance demandée")
    }

    if (message.content === prefix + "cardbenjamin"){
        var card_embed = new Discord.RichEmbed()
            .setColor('#FFA400')
            .setTitle("Benjamin")
            .setDescription("**Type d'arc:** Classique\n **Flèche obtenue:** Bleue\n **Distance:** 25m\n **Puissance:** --\n **Marque de poignée:** --\n **Marque des branches:** --")
        message.channel.sendEmbed(card_embed)
        console.log("CarteBenjamin")
    }

    if (message.content === prefix + "cardaurore"){
        var card_embed = new Discord.RichEmbed()
            .setColor('#FFA400')
            .setTitle("Aurore")
            .setDescription("**Type d'arc:** Classique\n **Flèche obtenue:** Noire\n **Distance:** 20m\n **Puissance:** --\n **Marque de poignée:** --\n **Marque des branches:** --")
        message.channel.sendEmbed(card_embed)
        console.log("CarteAurore")
    }

    if (message.content === prefix + "cardalix"){
        var card_embed = new Discord.RichEmbed()
            .setColor('#FFA400')
            .setTitle("Alix")
            .setDescription("**Type d'arc:** Classique\n **Flèche obtenue:** Noire\n **Distance:** 20m\n **Puissance:** --\n **Marque de poignée:** --\n **Marque des branches:** --")
        message.channel.sendEmbed(card_embed)
        console.log("CarteAlix")
    }

    if (message.content === prefix + "cardmorgane"){
        var card_embed = new Discord.RichEmbed()
            .setColor('#FFA400')
            .setTitle("Morgane")
            .setDescription("**Type d'arc:** Classique\n **Flèche obtenue:** Noire\n **Distance:** 20m\n **Puissance:** --\n **Marque de poignée:** --\n **Marque des branches:** --")
        message.channel.sendEmbed(card_embed)
        console.log("CarteMorgane")
    }

    if (message.content === prefix + "cardmickael"){
        var card_embed = new Discord.RichEmbed()
            .setColor('#FFA400')
            .setTitle("Mickaël")
            .setDescription("**Type d'arc:** Poulie\n **Flèche obtenue:** Jaune\n **Distance:** 40m\n **Puissance:** 43lbs\n **Marque de l'arc:** PSE Phenom XT 2017\n **Marque des flèches:** PSE Phenom XT 2017")
        message.channel.sendEmbed(card_embed)
        console.log("CarteMickael")
    }

    if (message.content === prefix + "cardtheo"){
        var card_embed = new Discord.RichEmbed()
            .setColor('#FFA400')
            .setTitle("Théo")
            .setDescription("**Type d'arc:** Classique\n **Flèche obtenue:** Rouge\n **Distance:** 30m\n **Puissance:** --\n **Marque de poignée:** --\n **Marque des branches:** --")
        message.channel.sendEmbed(card_embed)
        console.log("CarteTheo")
    }

    if (message.content === prefix + "helpf"){
        var helpf_embed = new Discord.RichEmbed()
            .setColor('#FFA400')
            .setTitle('Commandes fun')
            .addField("Ping", "Il vous répond pong")
            .addField("Luke", "Référence cinématographique")

        message.channel.sendEmbed(helpf_embed)
        console.log("Commande helpf demandée")
    }

    if (!message.content.startsWith(prefix)) return;
    var args = message.content.substring(prefix.length).split(" ");

    switch (args[0].toLowerCase()){

        case "newstory":
        var value = message.content.substr(10);
        var author = message.author.toString();
        var number = db.get('histoires').map('id').value();
        console.log(value);
        message.reply("Ajout de l'histoire a la base de données")
        

        db.get('histoires')
            .push({ story_value: value, story_author: author})
            .write();
        break;

        case "tellstory" :

        story_random();
        console.log(randnum);

        var story = db.get(`histoires[${randnum}].story_value`).toString().value();
        var author_story = db.get(`histoires[${randnum}].story_author`).toString().value();
        console.log(story);

        message.channel.send(`Voici l'histoire : ${story} (Histoire de ${author_story})`);

        break;
    }
});

function story_random(min, max) {
    min = Math.ceil(0);
    max = Math.floor(storynumber = 50);
    randnum = Math.floor(Math.random() * (max - min +1) + min);
}
