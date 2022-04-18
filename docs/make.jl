push!(LOAD_PATH, "../src/")
using Documenter, HazardAhead

makedocs(sitename="HazardAhead.ai",
    pages=[
        "Introduction" => "index.md"
        "Define Problem" => "define.md"
        "Design Pattern" => "pattern.md"
        "Data Points" => "process.md"
        "IOTs" => "iot.md"
        "AI/ML Predictions" => "ml.md"
        "Use Cases" => "usecase.md"
        "API" => "api.md"
    ],
)