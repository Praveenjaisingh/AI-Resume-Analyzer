class TextHelper {

    cleanResume(text) {
        text = String(text || "")
            .replace(/\r/g, "")
            .replace(/\t/g, " ")
            .replace(/\u2022/g, "•")
            .replace(/\n{2,}/g, "\n")
            .trim();
        const lines = text
            .split("\n")
            .map(line => line.trim())
            .filter(Boolean);
        const email =
            text.match(
                /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/i
            )?.[0] || "";
        const phoneMatch =
            text.match(
                /(\+?\d{1,3}[\s-]?)?(\(?\d{3,5}\)?[\s-]?)?\d{3,5}[\s-]?\d{3,5}/
            );
        const phone =
            phoneMatch
                ? phoneMatch[0]
                    .replace(/[^\d+]/g, " ")
                    .replace(/\s+/g, " ")
                    .trim()
                : "";
        const github =
            text.match(
                /github\.com\/[^\s|]+/i
            )?.[0] || "";
        const linkedin =
            text.match(
                /linkedin\.com\/[^\s|]+/i
            )?.[0] || "";
        const portfolio =
            text.match(
                /https?:\/\/[^\s]+/i
            )?.[0] || "";
        let name = "RESUME";
        for (const line of lines) {
            if (
                line.length > 2 &&
                line.length < 40 &&
                !line.includes("@") &&
                !line.includes("http") &&
                !line.includes("|") &&
                /^[A-Za-z\s]+$/.test(line)
            ) {
                name = line.toUpperCase();
                break;
            }
        }
        const sections = {
            summary: [],
            skills: [],
            projects: [],
            education: [],
            experience: [],
            certifications: []
        };
        const sectionMap = {
            summary: [
                "summary",
                "profile",
                "objective",
                "about me",
                "career objective"
            ],
            skills: [
                "skills",
                "technical skills",
                "technologies",
                "tools"
            ],
            projects: [
                "projects",
                "project"
            ],
            education: [
                "education",
                "academic"
            ],
            experience: [
                "experience",
                "employment",
                "work experience"
            ],
            certifications: [
                "certification",
                "certifications"
            ]
        };
        let currentSection = "";
        for (const line of lines) {
            const lower =
                line.toLowerCase();
            let foundSection = false;
            for (const key in sectionMap) {
                if (
                    sectionMap[key].some(
                        heading =>
                            lower.includes(heading)
                    )
                ) {
                    currentSection = key;
                    foundSection = true;
                    break;
                }
            }
            if (foundSection) {
                continue;
            }
            if (
                currentSection &&
                sections[currentSection]
            ) {
                if (
                    !sections[currentSection]
                        .includes(line)
                ) {
                    sections[currentSection]
                        .push(line);
                }
            }
        }
        if (
            sections.summary.length === 0
        ) {
            const summaryKeywords = [
                "graduate",
                "developer",
                "engineer",
                "experience",
                "passionate",
                "programming",
                "software"
            ];
            lines.forEach(line => {
                const lower =
                    line.toLowerCase();
                if (
                    summaryKeywords.some(
                        keyword =>
                            lower.includes(keyword)
                    )
                ) {
                    if (
                        line.length > 40
                    ) {
                        sections.summary.push(line);
                    }
                }
            });
        }
        if (
            sections.skills.length === 0
        ) {
            const skillKeywords = [
                "Java",
                "Python",
                "JavaScript",
                "TypeScript",
                "Node.js",
                "Express.js",
                "React",
                "MongoDB",
                "MySQL",
                "PostgreSQL",
                "SQL",
                "HTML",
                "CSS",
                "Laravel",
                "PHP",
                "Git",
                "GitHub"
            ];
            skillKeywords.forEach(skill => {
                if (
                    text
                        .toLowerCase()
                        .includes(
                            skill.toLowerCase()
                        )
                ) {
                    sections.skills.push(skill);
                }
            });
        }
        if (
            sections.projects.length === 0
        ) {
            const projectKeywords = [
                "developed",
                "implemented",
                "designed",
                "created",
                "built",
                "application",
                "website",
                "project"
            ];
            lines.forEach(line => {
                const lower =
                    line.toLowerCase();
                if (
                    projectKeywords.some(
                        keyword =>
                            lower.includes(keyword)
                    )
                ) {
                    if (
                        !sections.projects
                            .includes(line)
                    ) {
                        sections.projects.push(line);
                    }
                }
            });
        }
        if (
            sections.education.length === 0
        ) {
            const educationKeywords = [
                "college",
                "university",
                "school",
                "b.e",
                "btech",
                "b.tech",
                "computer science",
                "cgpa",
                "gpa",
                "hsc",
                "sslc",
                "higher secondary"
            ];
            lines.forEach(line => {
                const lower =
                    line.toLowerCase();
                if (
                    educationKeywords.some(
                        keyword =>
                            lower.includes(keyword)
                    )
                ) {
                    if (
                        !sections.education
                            .includes(line)
                    ) {
                        sections.education
                            .push(line);
                    }
                }
            });
        }
        return {
            name,
            phone,
            email,
            github,
            linkedin,
            portfolio,
            summary:
                sections.summary.join("\n"),
            skills:
                sections.skills.join("\n"),
            projects:
                sections.projects.join("\n"),
            education:
                sections.education.join("\n"),
            experience:
                sections.experience.join("\n"),
            certifications:
                sections.certifications.join("\n")
        };
    }

}

module.exports = new TextHelper();