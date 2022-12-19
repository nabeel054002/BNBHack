const arra = ["QmdjhKY1bwcYCvpoEkzrUJZcdtbGbJixQM2RhZW5og2PYp",
                "QmXtxmMDNB7i3cmqFAc6QQAc4YpWhhbuSTuwL44WPRUGpP",
                "QmZtHs1RqJTfiLVNHN5J1qs7kMgaCuPTdniaSRa6PJ7hdG",
                "QmeMtFdnvYAMWF3SAuNPARMbSU39zxdxiT4RyCuyT6xxBu"]
    var fs = require('fs');
    // var arra = ["QmQZrM7bvcB4KLfPXVft7pb2cATgFRpTiC3LAdNND1BGr9", "QmcDT9xqSJNesoALedAaLPzgX6MCNEVEz9uTv3zBQmzmuD", "Qmeg2kpUnqMN7bKcsPzDZ5TXU9cREFcQvM4mTbAdTScKnh", "QmR3ru9LeM9i7AyDGTyo78zxEdNYGLzwEFe2YR9qGfCjGs"];
    var ipfsurl = "https://gateway.pinata.cloud/ipfs/"
    var empty = "";
    var dicstring = {
        "attributes" : [ {
            "trait_type" : "NFT",
            "value" : "Soulbound"
        }, {
            "trait_type" : "Asset",
            "value" : "Non-transferable Badge"
        }, {
            "trait_type" : "Badge",
            "value" : "Minting First Soulbound Token"
            }, {
            "trait_type" : "Name",
            "value" : ""
            }   ],
        "description" : "This represents the proof of membership of Samsara",
        "image" : "",
        "name" : "Soulbound Token"
    }
    
    for(let i =4; i<arra.length+4; i++){
        let v = dicstring;
        let ipfslocalurl = ipfsurl+arra[i-4];
        v["image"] = ipfslocalurl;
        v["name"] = "char0"+(i+1).toString();
        // console.log(v["name"]);
        fs.writeFile("metadata0"+(i+1).toString()+".json", JSON.stringify(v), (err)=>{
            if(err){
                console.error(err);
            }
        });
    }
    
    //fs.writeFile("thing.json", dictstring);