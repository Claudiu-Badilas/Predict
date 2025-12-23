namespace Predict.Common.Configuration;

public class EnvironmentConfiguration : IEnvironmentConfiguration {

    public string NpsqlConnectionString;
    public string TokenKey;

    public string GetNpsqlConnectionString() {
        return "host=localhost;username=postgres;password=admin;database=postgres";
    }

    public string GetJWTKey() {
        return "adskd]ad)-{admkwamd2312dsa";
    }
}