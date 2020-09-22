using Microsoft.EntityFrameworkCore.Migrations;

namespace InStock.Migrations
{
    public partial class tryingToGetThingsWorking2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Inventories_Items_ItemIdRef",
                table: "Inventories");

            migrationBuilder.DropIndex(
                name: "IX_Inventories_ItemIdRef",
                table: "Inventories");

            migrationBuilder.DropColumn(
                name: "ItemIdRef",
                table: "Inventories");

            migrationBuilder.AddColumn<int>(
                name: "ItemId",
                table: "Inventories",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Inventories_ItemId",
                table: "Inventories",
                column: "ItemId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Inventories_Items_ItemId",
                table: "Inventories",
                column: "ItemId",
                principalTable: "Items",
                principalColumn: "ItemId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Inventories_Items_ItemId",
                table: "Inventories");

            migrationBuilder.DropIndex(
                name: "IX_Inventories_ItemId",
                table: "Inventories");

            migrationBuilder.DropColumn(
                name: "ItemId",
                table: "Inventories");

            migrationBuilder.AddColumn<int>(
                name: "ItemIdRef",
                table: "Inventories",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Inventories_ItemIdRef",
                table: "Inventories",
                column: "ItemIdRef",
                unique: true,
                filter: "[ItemIdRef] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_Inventories_Items_ItemIdRef",
                table: "Inventories",
                column: "ItemIdRef",
                principalTable: "Items",
                principalColumn: "ItemId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
