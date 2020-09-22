using Microsoft.EntityFrameworkCore.Migrations;

namespace InStock.Migrations
{
    public partial class tryingToGetThingsWorking : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Items",
                type: "varchar(16)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(16)");

            migrationBuilder.AddColumn<int>(
                name: "ItemIdRef",
                table: "Inventories",
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

        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Items",
                type: "varchar(16)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(16)",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ItemId",
                table: "Inventories",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Inventories_ItemId",
                table: "Inventories",
                column: "ItemId",
                unique: true,
                filter: "[ItemId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_Inventories_Items_ItemId",
                table: "Inventories",
                column: "ItemId",
                principalTable: "Items",
                principalColumn: "ItemId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
