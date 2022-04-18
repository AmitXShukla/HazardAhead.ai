push!(LOAD_PATH, "../src/")
using Documenter, HazardAhead

makedocs(sitename="HazardAhead.ai",
    pages=[
        "Introduction" => "index.md"
        "Define Problem" => "define.md"
        "Design Pattern" => "pattern.md"
        "IOTs" => "iot.md"
        "Trouble zone" => "process.md"
        "Use Cases" => "usecase.md"
        "AI/ML Predictions" => "ml.md"
        "API" => "api.md"
    ],
)