using Microsoft.EntityFrameworkCore.Migrations;

namespace InStock.Migrations
{
    public partial class IncreaseItemNameLength : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Items",
                type: "varchar(32)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(16)",
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Items",
                type: "varchar(16)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(32)",
                oldNullable: true);
        }
    }
}
