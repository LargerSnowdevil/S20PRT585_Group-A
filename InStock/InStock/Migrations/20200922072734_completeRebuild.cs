using Microsoft.EntityFrameworkCore.Migrations;

namespace InStock.Migrations
{
    public partial class completeRebuild : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Items_Shops_ShopId",
                table: "Items");

            migrationBuilder.DropIndex(
                name: "IX_Items_ShopId",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "InStock",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "SKU",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "ShopId",
                table: "Items");

            migrationBuilder.CreateTable(
                name: "DimShopItems",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ItemId = table.Column<int>(nullable: true),
                    ShopId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DimShopItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DimShopItems_Items_ItemId",
                        column: x => x.ItemId,
                        principalTable: "Items",
                        principalColumn: "ItemId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_DimShopItems_Shops_ShopId",
                        column: x => x.ShopId,
                        principalTable: "Shops",
                        principalColumn: "ShopId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Inventories",
                columns: table => new
                {
                    SKU = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Available = table.Column<int>(nullable: false),
                    Quantity = table.Column<int>(nullable: false),
                    ItemId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Inventories", x => x.SKU);
                    table.ForeignKey(
                        name: "FK_Inventories_Items_ItemId",
                        column: x => x.ItemId,
                        principalTable: "Items",
                        principalColumn: "ItemId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DimShopItems_ItemId",
                table: "DimShopItems",
                column: "ItemId");

            migrationBuilder.CreateIndex(
                name: "IX_DimShopItems_ShopId",
                table: "DimShopItems",
                column: "ShopId");

            migrationBuilder.CreateIndex(
                name: "IX_Inventories_ItemId",
                table: "Inventories",
                column: "ItemId",
                unique: true,
                filter: "[ItemId] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DimShopItems");

            migrationBuilder.DropTable(
                name: "Inventories");

            migrationBuilder.AddColumn<string>(
                name: "InStock",
                table: "Items",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Price",
                table: "Items",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Quantity",
                table: "Items",
                type: "varchar(16)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "SKU",
                table: "Items",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ShopId",
                table: "Items",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Items_ShopId",
                table: "Items",
                column: "ShopId");

            migrationBuilder.AddForeignKey(
                name: "FK_Items_Shops_ShopId",
                table: "Items",
                column: "ShopId",
                principalTable: "Shops",
                principalColumn: "ShopId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
