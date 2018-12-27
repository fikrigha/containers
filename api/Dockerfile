FROM microsoft/dotnet:2.2-sdk-alpine AS build
WORKDIR /app
COPY *.csproj ./dotnetapp/
COPY . ./dotnetapp/
WORKDIR /app/dotnetapp
RUN dotnet restore
WORKDIR /app
COPY . ./dotnetapp/
WORKDIR /app/dotnetapp
RUN dotnet add package ILLink.Tasks -v 0.1.5-preview-1841731 -s https://dotnet.myget.org/F/dotnet-core/api/v3/index.json
RUN dotnet publish -c Release -r linux-musl-x64 -o out /p:ShowLinkerSizeComparison=true
FROM microsoft/dotnet:2.2-runtime-deps-alpine AS runtime
WORKDIR /app
COPY --from=build /app/dotnetapp/out ./
ENTRYPOINT ["./dotnetapp"]