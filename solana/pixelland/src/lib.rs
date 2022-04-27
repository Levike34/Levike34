use anchor_lang::prelude::*;
use anchor_lang::solana_program::system_instruction;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

pub type Coords = [u32; 2];
pub type Grid = [Coords; 2];

#[program]
pub mod pixelland {
    use super::*;

    pub fn create(ctx: Context<Create>, authority: Pubkey, map_size: Grid) -> Result<()> {
        let map = &mut ctx.accounts.map;

        map.authority = authority;
        map.map_size = map_size;
   
        Ok(())
    }

}

#[derive(Accounts)]
pub struct Create<'info> {
    #[account(init, payer = authority, space = 16 + 16)]
    pub map: Account<'info, Map>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program <'info, System>,
}

#[account]
pub struct Map {
    pub authority: Pubkey,
    /// Plots owned.

    /// Price per Plot
    pub plot_price: u64,
    /// Mapsize
    pub map_size: Grid,
 
}

#[account]
pub struct Landowner {
    pub owner: Pubkey,
    pub plot: Grid,
}