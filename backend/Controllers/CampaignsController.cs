
using backend.Model;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class CampaignsController : ControllerBase
{
    private readonly CampaignStore _store;
    public CampaignsController(CampaignStore store)
    {
        _store = store;
    }

    [HttpGet("getCampaigns")]
    public IActionResult Get()
    {
        return Ok(_store.Campaigns);
    }

    public class StatusDto { public string? NewStatus { get; set; } }

    [HttpPost("{id}/status")]
    public async Task<IActionResult> UpdateStatus(int id, [FromBody] StatusDto dto)
    {
        if (!Request.Headers.TryGetValue("X-API-KEY", out var key) || key != "Ad-Api-Key-123")
            return Unauthorized();

        var c = _store.Campaigns.FirstOrDefault(x => x.Id == id);
        if (c == null) return NotFound();

        if (c.Status == "Active" && dto.NewStatus == "Archived")
            return BadRequest("Active can only go to Paused");
        // Added this delay to make this API behave like some time taking API :)
        await Task.Delay(2000);
        c.Status = dto.NewStatus;
        return Ok(c);
    }
}
