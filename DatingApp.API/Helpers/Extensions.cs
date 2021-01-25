using Microsoft.AspNetCore.Http;

namespace DatingApp.API.Helpers
{
    public static class Extensions
    {
        public static void AddApplicationError(this HttpResponse response, string message) 
        {
            /*Cria o cabeçalho incluindo a mensagem de erro na resposta*/
            response.Headers.Add("Application-Error", message);
            /*Pede que o cabeçalho criado seja mostrado pela requisicao*/
            response.Headers.Add("Access-Control-Expose-Headers", "Application-Error");
            /*Permite a exposicao de qualquer origem*/
            response.Headers.Add("Access-Control-Allow-Origin", "*");
        }
    }
}