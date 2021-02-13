using System.Collections.Generic;
using System.Linq;
using DatingApp.API.Models;
using Newtonsoft.Json;

namespace DatingApp.API.Data
{
    public class Seed
    {
        /*metodo estático para ser chamado sem a criação de uma instância da classe*/
        public static void SeedUsers(DataContext context)
        {
            if(!context.Users.Any()) /*inserir apenas se tabela vazia*/
            {
                /*Lendo do arquivo de dados*/
                var userData = System.IO.File.ReadAllText("Data/UserSeedData.json");
                /*Convertendo os dados para um objeto Users*/
                var users = JsonConvert.DeserializeObject<List<User>>(userData);
                /*Varrendo cada usuário convertido*/
                foreach(var user in users)
                {
                    /*criando uma senha para cada usuário*/
                    byte[] passwordHash, passwordSalt;
                    CreatePasswordHash("password", out passwordHash, out passwordSalt);
                    user.PasswordHash = passwordHash;
                    user.PasswordSalt = passwordSalt;
                    user.Username = user.Username.ToLower();
                    /*Adicionando usuário no banco*/
                    context.Users.Add(user);
                }
                /*Salvando inserções*/
                context.SaveChanges();
            }

        }

        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }

        }
    }
}