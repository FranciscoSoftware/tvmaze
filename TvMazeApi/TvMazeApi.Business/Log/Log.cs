using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace TvMazeApi.Business.Log
{
    public class LogCrud
    {
        private readonly IConfiguration _config;
        public LogCrud(IConfiguration config) {
            _config = config;
        }

        public void WriteLog(string Action , string Username) {
            string fileName = _config["LogURL"];
            string line = $"{DateTime.Now.ToString()}: Action = {Action} - Username - {Username} \n";
            if (!File.Exists(fileName))
            {
                var fs = File.Create(fileName);
                
                Byte[] byteLine = new UTF8Encoding(true).GetBytes(line);
                fs.Write(byteLine, 0, byteLine.Length);


            }
            else {
                using (StreamWriter sr = File.AppendText(fileName))
                {
                    sr.WriteLine(line);
                }
            }

        }
    }
}
