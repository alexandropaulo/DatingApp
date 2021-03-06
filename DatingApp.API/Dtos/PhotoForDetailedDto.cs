using System;

namespace DatingApp.API.Dtos
{
    public class PhotoForDetailedDto
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        
        /*Define se a foto é a principal e que aparecerá a identificação ou cards o usuário*/
        public bool IsMain { get; set; } 
    }
}