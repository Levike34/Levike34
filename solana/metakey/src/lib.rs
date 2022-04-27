use anchor_lang::prelude::*;
use anchor_lang::solana_program::system_instruction;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

pub type Balance = (Pubkey, u64);
pub type User = Vec<Balance>;

#[program]
pub mod metakey {
    use super::*;

    pub fn create(ctx: Context<Create>, authority: Pubkey) -> Result<()> {
        let metakey = &mut ctx.accounts.metakey;

        metakey.authority = authority;
   
        Ok(())
    }

    pub fn validate(ctx: Context<Validate>, authority: Pubkey) -> Result<()> {
        let metakey = &mut ctx.accounts.metakey;

        if metakey.authority != authority {
            return Err(error!(ErrorCode::Error));
        }
   
        Ok(())
    }

}

#[derive(Accounts)]
pub struct Create<'info> {
    #[account(init, payer = authority, space = 32 + 32)]
    pub metakey: Account<'info, Metakey>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program <'info, System>,
}

#[derive(Accounts)]
pub struct Validate<'info> {
    #[account(mut)]
    pub metakey: Account<'info, Metakey>,
    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(mut)]
    pub user: Signer<'info>,
}

#[account]
pub struct Metakey {
    pub authority: Pubkey,
  
    pub users: User,
 
}

#[error_code]
pub enum ErrorCode {
    #[msg("This is an error message clients will automatically display")]
    Error,
}


