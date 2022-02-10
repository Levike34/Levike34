 //"0xA4D64e6afFcbA6d771f0cEa2F43eD3E60998F2F2" NUKE Char address (bsc testnet)
 
 //const prefix = "https://gateway.pinata.cloud/ipfs/";
  let id = await nuclearCharacters.methods.profiles(accounts[0]).call({from:accounts[0]});
  let newId = id;
  let uri = await nuclearCharacters.methods.tokenURI(newId).call({from:accounts[0]});       //API call to blockchain, then
  const response = await fetch(uri);                                                        //fetch the data from the URL in IPFS
  if(!response.ok)
  throw new Error(response.statusText);                                                     //and set it to a json document.

  const json = await response.json();  //
   let suffix = json.image.slice(7);   // Load metadata from tokenURI and fix up the
   let mid = suffix.slice(0,-8);       //  IPFS Gateway format to load the image in
   console.log(mid);                   //  a decentralized way.
   let end = json.image.slice(-7);     //

   console.log(prefix);

   console.log(end);
   let pic = prefix + mid + '/images/' + end;
   console.log(pic);
   setProfilePic(pic);
