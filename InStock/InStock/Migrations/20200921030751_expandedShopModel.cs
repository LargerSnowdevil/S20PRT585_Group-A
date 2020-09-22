using Microsoft.EntityFrameworkCore.Migrations;

namespace InStock.Migrations
{
    public partial class expandedShopModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Shops",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ContactNumber",
                table: "Shops",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Lat",
                table: "Shops",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Long",
                table: "Shops",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address",
                table: "Shops");

            migrationBuilder.DropColumn(
                name: "ContactNumber",
                table: "Shops");

            migrationBuilder.DropColumn(
                name: "Lat",
                table: "Shops");

            migrationBuilder.DropColumn(
                name: "Long",
                table: "Shops");
        }
    }
}
