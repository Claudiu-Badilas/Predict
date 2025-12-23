namespace Predict.Common.Configuration;

public interface IEnvironmentConfiguration {

    string GetNpsqlConnectionString();
    string GetJWTKey();
}