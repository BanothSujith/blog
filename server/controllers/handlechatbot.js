const { generateContent } = require("../service/geminai");


async function handlechatbot (req,res){
    const {promt} = req.body;
try {
    const response = await generateContent(promt);
    res.status(200).json({response});
     
} catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json("error whule generating promt",error);
}
}

module.exports = handlechatbot;