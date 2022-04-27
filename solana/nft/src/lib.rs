use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

pub type Token = (u16, String);

#[program]
pub mod nft {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>, authority: Pubkey) -> Result<()> {
        let collection = &mut ctx.accounts.collection;

        collection.authority = authority;
        collection.base_uri = "https://samuraisaga.com/".to_string();
        collection.token_count = 0u16;

        Ok(())
    }

    pub fn mint(ctx: Context<Mint>, user: Pubkey) -> Result<()> {
        let nft = &mut ctx.accounts.nft;
        let collection = &mut ctx.accounts.collection;
        
        let uri_base = &collection.base_uri;

        if collection.token_count == 10_000 {
            return Err(error!(ErrorCode::MaxSupply))
        }
    
        let token_uri = uri_base.to_owned() + &collection.token_count.to_string();
        let token_id = collection.token_count;
        let minted_token: Token = (token_id, token_uri);

        nft.owner = user;
        nft.tokens.push(minted_token);
        collection.token_count += 1;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = authority, space = 32 + 32)]
    pub collection: Account<'info, Collection>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program <'info, System>,
}

#[derive(Accounts)]
pub struct Mint<'info> {
    #[account(init, payer = user, space = 16 + 16)]
    pub nft: Account<'info, Nft>,
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(mut)]
    pub collection: Account<'info, Collection>,
    pub system_program: Program <'info, System>,
}

#[account]
pub struct Nft {
    pub owner: Pubkey,
    pub tokens: Vec<Token>,
    pub balance: u16,
}

#[account]
pub struct Collection {
    pub authority: Pubkey,
    pub token_address: u64,
    pub base_uri: String,
    pub token_count: u16,
}

#[error_code]
pub enum ErrorCode {
    #[msg("Max Supply Exceeded")]
    MaxSupply,
}
