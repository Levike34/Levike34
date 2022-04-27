use sha256::digest;
use std::collections::HashMap;




pub struct Block {
    tick: u64,
    tick_hash: String,
    mapp: HashMap<u64, String>
  
}


fn main() {
   
    let hash = digest("Socrates");
    let x = hash.clone();
    let mut block: Block = Block {
        tick_hash: x,
        tick: 0,
        mapp: HashMap::new(),

    };
   
    block.mapp.insert(0, hash);
    let num = block.mapp.get(&0).unwrap();
    println!("Genesis: {}", num);
    
   
 
    while block.tick < 1_000_001 {
        if block.tick == 1_000_000 {
            
            println!("Final: {}", block.tick_hash);
            let num = block.mapp.get(&100).unwrap();
            println!("100: {}", num);
            let num2 = block.mapp.get(&30).unwrap();
            println!("30: {}", num2);
            let num3 = block.mapp.get(&10000).unwrap();
            println!("10000: {}", num3);
        } 
        else {
            let new_hash = sha256::digest(block.tick_hash);
            let new_hashx = new_hash.clone();
            block.tick_hash = new_hash;
            block.mapp.insert(block.tick, new_hashx);
        }
        block.tick += 1;
        
    

    } 
}
