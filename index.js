var Discord = require("discord.js");
var bot = new Discord.Client();
var isReady = true;

bot.on(
	"message", message => {
		if (isReady && message.content === "oh dear") {
			isReady = false;
			// console.log(bot.channels.cache)

			// that one specific channel on that one specific server :
			// var voiceChannel = bot.channels.cache.get("622846233903628362");

			// voice channel general on server hosting the text channel from which the message originates
			// var voiceChannel = message.guild.channels.cache.find((value,key,collection)=>value.name=="General" && value.type=="voice");

			// voice channel on which message author is connected 
			var voiceChannel = message.member.voice.channel;

			// voice channel on which tagged user is connected

			voiceChannel.join().then(
				connection => {
					const dispatcher = connection.play("./media/troll.mp4");
					dispatcher.on(
						"end", end => {
							voiceChannel.leave();
						}
					);
				}
			).catch(err => console.log(err));
			isReady = true;
		}
	}
);

// client.login(process.env.BOT_TOKEN);
