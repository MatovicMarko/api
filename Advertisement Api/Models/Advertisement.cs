namespace Advertisement_Api.Models
{
    public class Advertisement
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Type { get; set; }
        public int ConstructionYear { get; set; }
        public int Price { get; set; }
        public Agency Agency { get; set; }
        public int AgencyId { get; set; }
    }
}
