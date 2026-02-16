namespace backend.Model
{
   public class CampaignStore
   {
        public List<Campaign> Campaigns { get; set; } = new();

        public CampaignStore()
        {
            var json = System.IO.File.ReadAllText("campaigns.json");
            var root = System.Text.Json.JsonSerializer.Deserialize<CampaignRoot>(json);
            Campaigns = root?.Campaigns ?? new List<Campaign>();
        }
   }

    public class CampaignRoot
    {
        public List<Campaign>? Campaigns { get; set; }
    }

    public class Campaign
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Status { get; set; }
        public double Budget { get; set; }
    }
}
