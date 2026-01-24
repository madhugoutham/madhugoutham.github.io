export interface Project {
    id: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    image: string;
    technologies: string[];
    category: "finance" | "research" | "enterprise" | "ai";
    metrics: {
        label: string;
        value: string;
    }[];
    featured: boolean;
    caseStudySlug?: string;
    githubUrl?: string;
    liveUrl?: string;
}

export const projects: Project[] = [
    {
        id: "fraud-detection",
        title: "Multi-Agent Fraud Detection System",
        shortDescription:
            "Real-time ensemble model processing 250K+ daily transactions with 95% accuracy and 45ms latency.",
        fullDescription:
            "Designed and deployed a sophisticated multi-agent fraud detection system using ensemble methods. The system processes over 250,000 daily transactions in real-time, achieving 95% fraud detection accuracy while reducing latency from 200ms to 45ms through optimized model serving and caching strategies.",
        image: "/projects/fraud-detection.jpg",
        technologies: ["PyTorch", "XGBoost", "AWS SageMaker", "Kafka", "Redis"],
        category: "finance",
        metrics: [
            { label: "Accuracy", value: "95%" },
            { label: "Latency", value: "45ms" },
            { label: "Daily Transactions", value: "250K+" },
            { label: "Annual Savings", value: "$2.1M" },
        ],
        featured: true,
        caseStudySlug: "fraud-detection",
    },
    {
        id: "rag-credit-risk",
        title: "RAG-Enhanced Credit Risk Assessment",
        shortDescription:
            "LLM-powered system for intelligent credit risk analysis with 87% accuracy in risk factor identification.",
        fullDescription:
            "Built a Retrieval-Augmented Generation (RAG) system for credit risk assessment that combines traditional ML models with large language models. The system analyzes unstructured financial documents and provides explainable risk factor identification with 87% accuracy.",
        image: "/projects/credit-risk.jpg",
        technologies: ["LangChain", "OpenAI GPT-4", "Pinecone", "FastAPI", "AWS Bedrock"],
        category: "ai",
        metrics: [
            { label: "Accuracy", value: "87%" },
            { label: "Processing Time", value: "<3s" },
            { label: "Document Types", value: "15+" },
        ],
        featured: true,
        caseStudySlug: "rag-credit-risk",
    },
    {
        id: "environmental-ai",
        title: "AI-Driven Environmental Mapping",
        shortDescription:
            "Award-winning U-Net++ CNN for surface water detection achieving 93.6% F1-score.",
        fullDescription:
            "Developed an advanced computer vision system for environmental health risk mapping using U-Net++ architecture. The model detects surface water bodies from satellite imagery with 93.6% F1-score, enabling accurate flood risk assessment and environmental monitoring. Won 3rd prize at the 2024 IIN Sustainability Conference.",
        image: "/projects/environmental.jpg",
        technologies: ["PyTorch", "U-Net++", "Google Earth Engine", "GeoPandas", "TensorFlow"],
        category: "research",
        metrics: [
            { label: "F1-Score", value: "93.6%" },
            { label: "AUC", value: "0.92" },
            { label: "Award", value: "3rd Prize IIN" },
        ],
        featured: true,
        caseStudySlug: "environmental-ai",
    },
    {
        id: "predictive-maintenance",
        title: "Industrial Predictive Maintenance",
        shortDescription:
            "ML system predicting equipment failures with 92% accuracy, reducing unplanned downtime.",
        fullDescription:
            "Engineered a predictive maintenance solution for industrial equipment using time-series analysis and ensemble methods. The system monitors sensor data in real-time and predicts equipment failures with 92% accuracy, significantly reducing unplanned downtime and maintenance costs.",
        image: "/projects/maintenance.jpg",
        technologies: ["Python", "Scikit-learn", "Apache Spark", "InfluxDB", "Grafana"],
        category: "enterprise",
        metrics: [
            { label: "Prediction Accuracy", value: "92%" },
            { label: "Downtime Reduction", value: "35%" },
            { label: "Cost Savings", value: "$500K/yr" },
        ],
        featured: false,
        caseStudySlug: "predictive-maintenance",
    },
    {
        id: "real-time-scoring",
        title: "Real-Time Fraud Scoring at Scale",
        shortDescription:
            "High-throughput fraud scoring system processing 50M monthly events with 99ms latency.",
        fullDescription:
            "Built a high-performance real-time fraud scoring system at Experian processing 50 million monthly events. Achieved 99ms average latency through optimized feature engineering, model quantization, and distributed inference architecture.",
        image: "/projects/scoring.jpg",
        technologies: ["Python", "Kubernetes", "Apache Flink", "TensorFlow Serving", "AWS"],
        category: "finance",
        metrics: [
            { label: "Monthly Events", value: "50M" },
            { label: "Latency", value: "99ms" },
            { label: "Fraud Reduction", value: "38%" },
            { label: "Annual Savings", value: "$2.3M" },
        ],
        featured: false,
    },
    {
        id: "marketing-prediction",
        title: "Marketing Campaign Optimization",
        shortDescription:
            "ML model predicting campaign success with 85% accuracy, optimizing marketing ROI.",
        fullDescription:
            "Developed machine learning models for marketing campaign prediction that achieved 85% accuracy in forecasting campaign outcomes. The system provided actionable insights for campaign optimization, significantly improving marketing ROI.",
        image: "/projects/marketing.jpg",
        technologies: ["Python", "XGBoost", "Pandas", "Tableau", "SQL"],
        category: "enterprise",
        metrics: [
            { label: "Accuracy", value: "85%" },
            { label: "ROI Improvement", value: "28%" },
        ],
        featured: false,
    },
];

export const skills = {
    programming: ["Python", "R", "Java", "Scala", "C++", "SQL"],
    mlai: [
        "Deep Learning",
        "NLP",
        "Computer Vision",
        "LLM Fine-tuning",
        "Multi-Agent Systems",
        "Reinforcement Learning",
    ],
    frameworks: [
        "PyTorch",
        "TensorFlow",
        "Scikit-learn",
        "XGBoost",
        "Hugging Face",
        "LangChain",
    ],
    cloud: [
        "AWS SageMaker",
        "AWS Bedrock",
        "AWS Lambda",
        "Azure ML",
        "GCP Vertex AI",
        "Kubernetes",
    ],
    agenticAI: ["LangChain", "LangGraph", "AutoGen", "CrewAI", "RAG", "GraphRAG"],
};

export const experience = [
    {
        title: "Senior Data Scientist",
        company: "KeyBank",
        period: "Nov 2024 - Present",
        location: "USA",
        highlights: [
            "Reduced false positives from 5% to 2% in fraud detection system",
            "Developed loan default prediction model with 0.85 AUC",
            "Lead cross-functional team of 5 data scientists",
        ],
    },
    {
        title: "Data Scientist (GRA)",
        company: "Northern Illinois University",
        period: "Aug 2023 - Oct 2024",
        location: "USA",
        highlights: [
            "Built environmental health risk models achieving 0.92 AUC",
            "Developed U-Net++ CNN for water detection (93.6% F1-score)",
            "Published research in International Association of Hydrological Sciences",
        ],
    },
    {
        title: "Data Scientist",
        company: "TCS / Experian",
        period: "May 2021 - Jul 2023",
        location: "India",
        highlights: [
            "Reduced fraud losses by 38% ($2.3M annually)",
            "Built real-time scoring processing 50M monthly events",
            "Achieved 99ms latency for fraud detection pipeline",
        ],
    },
    {
        title: "Data Scientist",
        company: "Stanley Black & Decker",
        period: "Mar 2019 - Apr 2021",
        location: "India",
        highlights: [
            "Developed marketing prediction model with 85% accuracy",
            "Optimized ETL pipelines reducing processing time by 40%",
            "Built automated reporting dashboards for executive team",
        ],
    },
];

export const certifications = [
    "AWS Certified Solutions Architect – Associate",
    "AWS Certified Cloud Practitioner",
    "Deep Learning Specialization",
    "MLOps Specialization",
    "Generative AI with LLMs",
];

export const publications = [
    {
        title: "USS-Water Dataset and U-Net+ Model",
        journal: "International Association of Hydrological Sciences",
        year: 2024,
        status: "Published",
    },
    {
        title: "Building Classification: A Comprehensive Dataset and DenseNet201-Based Approach",
        journal: "Under Peer Review",
        year: 2024,
        status: "In Review",
    },
];
