<template>
  <q-page class="flex flex-center">
    <div class="text-center q-pa-md flex column flex-center">
      <h1 class="text-h4 q-mb-lg">Choose an idea</h1>
      <div class="note-holder">
        <div v-for="(idea, index) in ideas" :key="idea.id">
          <transition
            appear
            :enter-active-class="
              [
                'animated slower bounceInLeft',
                'animated slower bounceInDown',
                'animated slower bounceInRight',
                'animated slower bounceInUp',
              ][Math.floor(Math.random() * 5)]
            "
          >
            <q-card
              v-if="index <= activeIdea"
              :class="['note', 'note-' + (index + 1), 'list-item']"
              :style="{ zIndex: index }"
            >
              <q-card-section>
                <p>{{ idea.description }}</p>
              </q-card-section>
            </q-card>
          </transition>
        </div>
      </div>
    </div>
    <q-footer
      class="bg-transparent flex flex-center q-pa-xl q-gutter-md text-dark"
    >
      <q-btn
        size="lg"
        round
        color="grey-4"
        text-color="dark"
        unelevated
        icon="fa-sharp fa-solid fa-refresh"
        @click="showNextIdea()"
        :disable="activeIdea > getLength(ideas) - 1"
      />
      <q-btn
        size="lg"
        round
        color="primary"
        text-color="dark"
        icon="fa-sharp fa-solid fa-check"
        @click="showAlert"
      />
    </q-footer>
  </q-page>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  name: "IdeasPage",
  setup() {
    const isLoading = ref(false);
    const ideas = ref([]);
    const activeIdea = ref(0);

    const getIdeas = async () => {
      isLoading.value = true;

      ideas.value = [
        {
          id: "1",
          title: "AI-Assisted Drug Efficacy Prediction",
          description:
            "Develop an AI platform to predict the efficacy of drug molecules in combating specific diseases.",
          first_users:
            "Collaborate with research institutions and small pharma companies for initial trials and feedback.",
          first_million:
            "Expand the database, improve algorithm accuracy, and license the platform to pharmaceutical companies.",
        },
        {
          id: "2",
          title: "Speedy AI Drug Approval",
          description:
            "An AI system to streamline the drug approval process by predicting potential regulatory hurdles.",
          first_users:
            "Target biotech startups and smaller pharmaceutical firms looking to navigate the approval process more efficiently.",
          first_million:
            "Offer consultancy services to pharma companies and expand the AI's capabilities to global regulatory frameworks.",
        },
        {
          id: "3",
          title: "AI-Driven Protein Interaction Analysis",
          description:
            "Use AI to analyze and predict protein-protein interactions for new drug discovery.",
          first_users:
            "Partner with academic research labs and biotech startups working on novel drug discovery.",
          first_million:
            "Expand the model's complexity and database, then offer the service to larger pharmaceutical companies.",
        },
        {
          id: "4",
          title: "AI for Personalized Cancer Treatment",
          description:
            "An AI platform that suggests personalized drug combinations for cancer treatment based on genetic data.",
          first_users:
            "Approach oncologists and cancer research centers for initial implementation and testing.",
          first_million:
            "Collaborate with healthcare providers for clinical trials and improve the algorithm's accuracy with more data.",
        },
        {
          id: "5",
          title: "Generative AI for Novel Molecules",
          description:
            "Use generative AI to design novel drug molecules for specific diseases.",
          first_users:
            "Engage with research-focused pharma companies and universities involved in drug development research.",
          first_million:
            "Develop more advanced AI capabilities and partner with pharmaceutical companies for molecule testing and development.",
        },
        {
          id: "6",
          title: "AI-Optimized Clinical Trials",
          description:
            "Develop an AI tool to optimize the design and execution of clinical trials.",
          first_users:
            "Target smaller pharmaceutical companies and clinical research organizations.",
          first_million:
            "Expand the AI's capabilities for more complex trials and offer consultancy services to pharma companies.",
        },
        {
          id: "7",
          title: "AI for Drug Repurposing",
          description:
            "An AI platform to identify new uses for existing drugs.",
          first_users:
            "Collaborate with universities and research institutions initially, followed by pharma companies.",
          first_million:
            "License the technology to pharmaceutical companies for drug repurposing projects.",
        },
        {
          id: "8",
          title: "AI-Enhanced Drug Delivery Systems",
          description:
            "Utilize AI to develop more efficient drug delivery mechanisms.",
          first_users:
            "Approach companies specializing in drug delivery technologies and startups focusing on innovative medical solutions.",
          first_million:
            "Partner with pharmaceutical companies to implement these enhanced delivery systems.",
        },
        {
          id: "9",
          title: "AI for Toxicity Prediction",
          description:
            "Create an AI tool to predict the toxicity of new drug compounds.",
          first_users:
            "Reach out to small and medium-sized pharma companies focusing on early-stage drug development.",
          first_million:
            "Sell the AI tool to pharmaceutical companies to reduce their R&D risks and costs.",
        },
        {
          id: "10",
          title: "AI-Driven Drug Manufacturing Optimization",
          description:
            "Use AI to optimize drug manufacturing processes for efficiency and reduced costs.",
          first_users:
            "Target smaller drug manufacturers looking for cost-effective ways to optimize production.",
          first_million:
            "Offer the system as a SaaS solution to pharmaceutical manufacturers.",
        },
        {
          id: "11",
          title: "AI Legal Research Assistant",
          description:
            "An AI tool that conducts comprehensive legal research quickly.",
          first_users:
            "Approach small to medium law firms and offer free trials to demonstrate the tool's effectiveness.",
          first_million:
            "Offer subscriptions to law firms and legal departments, continuously improve the AI's capabilities.",
        },
        {
          id: "12",
          title: "AI Contract Reviewer",
          description:
            "An AI platform to analyze and suggest improvements in legal contracts.",
          first_users:
            "Offer free contract reviews to startups and small businesses to build a user base and gather feedback.",
          first_million:
            "License the platform to corporate legal departments and law firms.",
        },
        {
          id: "13",
          title: "AI Code Debugging Assistant",
          description:
            "An AI tool that helps programmers identify and fix coding errors.",
          first_users:
            "Offer the tool on programming forums and to computer science departments in universities.",
          first_million:
            "Sell the tool to software development companies and freelance developers.",
        },
        {
          id: "14",
          title: "AI-Powered Legal Advisory",
          description:
            "An AI system providing basic legal advice for common legal issues.",
          first_users:
            "Partner with legal aid organizations and online legal forums.",
          first_million:
            "Offer the service to individuals and small businesses, then scale up to larger clients.",
        },
        {
          id: "15",
          title: "AI Efficiency Analyzer for Programmers",
          description:
            "An AI tool that analyzes and suggests efficiency improvements in code.",
          first_users: "Reach out to coding bootcamps and tech meetups.",
          first_million:
            "Market to software companies and educational institutions with programming courses.",
        },
        {
          id: "16",
          title: "AI Legal Case Predictor",
          description:
            "An AI system that predicts legal case outcomes based on historical data.",
          first_users:
            "Provide trial services to law schools for educational purposes.",
          first_million: "Offer insights to law firms and legal analysts.",
        },
        {
          id: "17",
          title: "AI Coding Project Manager",
          description:
            "An AI assistant that helps manage software development projects.",
          first_users:
            "Offer the product to local tech startups and software development teams.",
          first_million: "Market to IT companies and freelance developers.",
        },
        {
          id: "18",
          title: "AI Compliance Checker",
          description:
            "An AI tool for businesses to ensure compliance with legal regulations.",
          first_users:
            "Offer free compliance audits to gain trust and validate the tool's effectiveness.",
          first_million:
            "Target heavily regulated industries like finance and healthcare.",
        },
        {
          id: "19",
          title: "AI Assistant for Legal Document Drafting",
          description:
            "AI that assists in drafting legal documents based on user inputs.",
          first_users:
            "Offer the service on legal forums and freelance legal platforms.",
          first_million:
            "Sell as a service to solo practitioners and small law firms.",
        },
        {
          id: "20",
          title: "AI Legal Billing Optimizer",
          description: "An AI system for optimizing legal billing processes.",
          first_users:
            "Offer free initial assessments to law firms to showcase potential savings.",
          first_million:
            "Market to law firms of all sizes to improve their billing practices.",
        },
        {
          id: "21",
          title: "Hyperautomation in Robotics",
          description:
            "Develop a platform that integrates cutting-edge technologies like robotic process automation (RPA), machine learning (ML), and artificial intelligence (AI) to optimize corporate operations.",
          first_users:
            "Reach out to industry conferences and events to showcase the platform and offer limited free trials to early adopters.",
          first_million:
            "Offer the platform to enterprise companies as a solution to streamline their operations and reduce costs.",
        },
        {
          id: "22",
          title: "Robotic Process Automation in Healthcare",
          description:
            "Develop RPA software specifically tailored for automating manual and repetitive tasks in healthcare institutions.",
          first_users:
            "Partner with a few healthcare facilities to pilot the RPA software, and use their positive experiences as case studies to attract other users.",
          first_million:
            "Target large hospital networks and healthcare organizations as potential clients for the RPA software.",
        },
        {
          id: "23",
          title: "Cloud-Based Collaborative Robotics and Automation",
          description:
            "Create a cloud-based platform that allows collaborative programming and control of robots for various industrial and manufacturing applications.",
          first_users:
            "Offer the platform to a select group of manufacturing companies for a trial period, and provide hands-on training and support for implementation.",
          first_million:
            "Market the platform to large manufacturing companies seeking to enhance operational efficiencies and reduce manual labor costs.",
        },
        {
          id: "24",
          title: "Intelligent Automation for Manufacturing",
          description:
            "Develop intelligent automation solutions that combine robotics and AI to optimize manufacturing processes and minimize manual labor.",
          first_users:
            "Identify manufacturing companies willing to adopt innovative solutions and offer them a trial package for testing the intelligent automation system.",
          first_million:
            "Target mid-sized manufacturing companies and offer customized intelligent automation solutions to improve their productivity and reduce operational costs.",
        },
        {
          id: "25",
          title: "RPA for Supply Chain Management",
          description:
            "Create a robotic process automation tool focused on streamlining supply chain management operations for businesses.",
          first_users:
            "Offer the RPA tool at a discounted rate to a handful of e-commerce businesses, and leverage their positive feedback for further market penetration.",
          first_million:
            "Pitch the RPA tool to e-commerce and retail companies as a solution to improve their supply chain efficiency and reduce processing times.",
        },
        {
          id: "26",
          title: "Robotic Automation for Space Exploration",
          description:
            "Develop specialized robots designed for space exploration missions, including planetary rovers and autonomous drones for extraterrestrial research.",
          first_users:
            "Collaborate with space research facilities to conduct trials and demonstrations of the robotic exploration systems, and capture user feedback for improvement and expansion.",
          first_million:
            "Partner with space agencies and research institutions to offer robotic exploration solutions for upcoming space missions and research projects.",
        },
        {
          id: "27",
          title: "Self-Driving Car Robotics",
          description:
            "Create a self-driving car system that integrates advanced robotics for autonomous navigation and vehicle control.",
          first_users:
            "Demonstrate the capabilities of the self-driving car system to potential users through test drives and pilot projects in partnership with transportation companies and authorities.",
          first_million:
            "Collaborate with automotive companies and transportation services to offer the self-driving car system as a futuristic transportation solution.",
        },
        {
          id: "28",
          title: "Industrial Robotics for Digital Transformation",
          description:
            "Develop industrial robotic solutions aimed at digitally transforming manufacturing and production processes for greater efficiency and flexibility.",
          first_users:
            "Approach manufacturing plants and offer to conduct pilot installations of the robotic systems to showcase their benefits and gain initial user feedback.",
          first_million:
            "Target large manufacturing plants and facilities seeking to modernize their operations, and offer custom robotic solutions for their specific production needs.",
        },
        {
          id: "29",
          title: "Robotics Technology for Medical Applications",
          description:
            "Develop specialized robotic systems for medical applications, such as surgical robots and assistive devices for patient care and rehabilitation.",
          first_users:
            "Partner with medical institutions to conduct live demonstrations of the robotic systems, and engage key medical professionals as early adopters to showcase the benefits of the technology.",
          first_million:
            "Collaborate with hospitals and medical research institutions to offer robotic solutions for surgical and medical care applications.",
        },
        {
          id: "30",
          title: "Robotic Automation for Warehouse Management",
          description:
            "Create robotic automation solutions tailored for warehouse management and logistics operations, such as autonomous inventory management and fulfillment systems.",
          first_users:
            "Offer the robotic automation system to a select group of warehouse facilities for a trial period, and showcase the improvements in operational efficiency and cost savings.",
          first_million:
            "Pitch the robotic automation solutions to e-commerce and logistics companies as a way to optimize their warehouse processes and improve order fulfillment efficiency.",
        },
      ];

      isLoading.value = false;
    };

    const showNextIdea = () => {
      activeIdea.value = activeIdea.value + 1;
    };

    const showAlert = () => {
      window.alert("Coming soon");
    };

    const reloadPage = () => {
      window.location.reload();
    };

    const getLength = (item) => {
      if (typeof item === "object" && item !== null) {
        return Object.keys(item).length;
      }
      return 0;
    };

    onMounted(getIdeas);

    return {
      isLoading,
      showAlert,
      reloadPage,
      ideas,
      activeIdea,
      showNextIdea,
      getLength,
    };
  },
};
</script>
