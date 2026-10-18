import os
import sys
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.units import inch
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super(NumberedCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_number(num_pages)
            super(NumberedCanvas, self).showPage()
        super(NumberedCanvas, self).save()

    def draw_page_number(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 9)
        self.setFillColor(colors.HexColor("#64748B"))
        
        # Header (pages > 1)
        if self._pageNumber > 1:
            self.drawString(54, 755, "NIMCET Prep Pro — Complete Project, API & Environment Guide")
            self.setStrokeColor(colors.HexColor("#CBD5E1"))
            self.setLineWidth(0.5)
            self.line(54, 747, letter[0] - 54, 747)
            
        # Footer
        footer_text = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(letter[0] - 54, 36, footer_text)
        self.drawString(54, 36, "Confidential — Designed for AIR 1 NIMCET Aspirants & Developers")
        self.setStrokeColor(colors.HexColor("#CBD5E1"))
        self.setLineWidth(0.5)
        self.line(54, 48, letter[0] - 54, 48)
        self.restoreState()

def build_pdf(filename):
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=54,
        bottomMargin=54
    )

    styles = getSampleStyleSheet()
    
    # Custom Palette
    c_primary = colors.HexColor("#4F46E5")     # Indigo
    c_primary_dark = colors.HexColor("#3730A3")
    c_secondary = colors.HexColor("#0284C7")   # Sky Blue
    c_dark = colors.HexColor("#0F172A")        # Slate 900
    c_body = colors.HexColor("#334155")        # Slate 700
    c_light_bg = colors.HexColor("#F8FAFC")
    c_accent_orange = colors.HexColor("#EA580C")
    c_accent_green = colors.HexColor("#16A34A")

    # Typography Styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=28,
        textColor=c_primary,
        spaceAfter=6
    )

    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=12,
        leading=16,
        textColor=colors.HexColor("#475569"),
        spaceAfter=15
    )

    h1_style = ParagraphStyle(
        'SectionH1',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=15,
        leading=19,
        textColor=c_dark,
        spaceBefore=14,
        spaceAfter=8,
        keepWithNext=True
    )

    h2_style = ParagraphStyle(
        'SectionH2',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=15,
        textColor=c_primary_dark,
        spaceBefore=10,
        spaceAfter=6,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'BodyDark',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        textColor=c_body,
        spaceAfter=6
    )

    bullet_style = ParagraphStyle(
        'BulletDark',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        textColor=c_body,
        leftIndent=14,
        firstLineIndent=-10,
        spaceAfter=4
    )

    code_style = ParagraphStyle(
        'CodeSnippet',
        parent=styles['Normal'],
        fontName='Courier',
        fontSize=8.5,
        leading=11,
        textColor=colors.HexColor("#0F172A")
    )

    callout_style = ParagraphStyle(
        'CalloutText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=colors.HexColor("#1E293B")
    )

    story = []

    # 1. Header Banner Box
    banner_data = [
        [
            Paragraph("<b>NIMCET PREP PRO — ENTERPRISE GUIDE</b>", ParagraphStyle('BannerSub', fontName='Helvetica-Bold', fontSize=10, textColor=colors.HexColor("#FCD34D"), spaceAfter=2)),
        ],
        [
            Paragraph("Complete Architecture, API Setup, Permissions & .env Configuration Guide", ParagraphStyle('BannerTitle', fontName='Helvetica-Bold', fontSize=18, leading=22, textColor=colors.white)),
        ],
        [
            Paragraph("Tailored for AIR 1 Preparation | 10-Yr NIMCET + 10-Yr CAT Reasoning | Full MERN Stack", ParagraphStyle('BannerFoot', fontName='Helvetica', fontSize=9.5, textColor=colors.HexColor("#E0E7FF"))),
        ]
    ]
    banner_table = Table(banner_data, colWidths=[504])
    banner_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), c_primary),
        ('ALIGN', (0,0), (-1,-1), 'LEFT'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('TOPPADDING', (0,0), (-1,-1), 12),
        ('BOTTOMPADDING', (0,0), (-1,-1), 12),
        ('LEFTPADDING', (0,0), (-1,-1), 16),
        ('RIGHTPADDING', (0,0), (-1,-1), 16),
        ('ROUNDEDCORNERS', [6, 6, 6, 6])
    ]))
    story.append(banner_table)
    story.append(Spacer(1, 14))

    # Meta Table
    meta_data = [
        [
            Paragraph("<b>Target Exam:</b> NIMCET 2025/2026", body_style),
            Paragraph("<b>Target NIT:</b> NIT Trichy (#1 Ranked)", body_style),
            Paragraph("<b>Stack:</b> React 18, Vite, Node, Express, Mongo", body_style)
        ],
        [
            Paragraph("<b>AI Model:</b> Google Gemini Flash", body_style),
            Paragraph("<b>Auth:</b> JWT + Google OAuth 2.0", body_style),
            Paragraph("<b>Status:</b> Fully Standalone (In-Memory + DB)", body_style)
        ]
    ]
    meta_table = Table(meta_data, colWidths=[168, 168, 168])
    meta_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), c_light_bg),
        ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor("#E2E8F0")),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#E2E8F0")),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10)
    ]))
    story.append(meta_table)
    story.append(Spacer(1, 12))

    # SECTION 1: System Overview
    story.append(Paragraph("1. Executive Overview & Core Features", h1_style))
    story.append(Paragraph(
        "NIMCET Prep Pro is an advanced, high-performance web platform designed specifically for students aiming for <b>All India Rank 1 (AIR 1)</b> in the NIT MCA Common Entrance Test (NIMCET). The application bridges the gap between weak mathematical foundations and top-tier competitive mastery through line-by-line step explanations, prerequisite breakdowns, and high-difficulty CAT reasoning sets.",
        body_style
    ))
    
    features = [
        "<b>Comprehensive 10-Year Question Bank:</b> Complete real papers from NIMCET 2015 through 2024 with categorized difficulty (Easy, Moderate, Hard).",
        "<b>10-Year CAT DILR & Reasoning Sets:</b> Advanced seating arrangement, logical deductions, syllogisms, and coding problems to build unmatched reasoning speed.",
        "<b>Interactive Chapter & Topic Navigation:</b> Collapsible sidebar organizing Coordinate Geometry, Calculus, Algebra, Probability, Vectors, and Trigonometry.",
        "<b>Gemini AI Step-by-Step Problem Solver:</b> When a student fails or requests assistance, Gemini provides calculus breakdown, exact formulas used, and foundational concepts to learn first.",
        "<b>Authenticated Student Profile & Real-Time Persistence:</b> Dynamic dashboard tracking student accuracy, score benchmarks, goal NIT, and personalized study notes."
    ]
    for feat in features:
        story.append(Paragraph(f"• {feat}", bullet_style))
    story.append(Spacer(1, 10))

    # SECTION 2: Architecture & Directory Structure
    story.append(Paragraph("2. Project Architecture & File Structure", h1_style))
    story.append(Paragraph(
        "The project follows clean MVC architecture on the backend and modern React modular components on the frontend:",
        body_style
    ))

    dir_structure = """nimcet-prep-pro/
├── client/                      # React 18 + Vite Frontend Application
│   ├── src/
│   │   ├── components/Layout/   # Header (with profile avatar & Google Auth), Sidebar, Footer
│   │   ├── context/             # AuthContext (token storage), ThemeContext, SidebarContext
│   │   ├── pages/               # Practice, MockTest, Dashboard, Profile, Login, Register
│   │   └── services/api.js      # Axios client with JWT interceptor & Google Auth endpoint
│   ├── .env                     # Frontend environment (VITE_API_URL, VITE_GOOGLE_CLIENT_ID)
│   └── package.json             # Vite, React-Icons, Katex/Math formatting
├── server/                      # Node.js + Express Backend Engine
│   ├── config/inMemoryStore.js  # Zero-dependency, zero-delay memory cache (Auto fallback)
│   ├── controllers/             # authController, questionController, mockTestController, aiController
│   ├── models/                  # User, Question, MockTest, Bookmark (Mongoose Schema)
│   ├── routes/                  # RESTful API routing (/api/auth, /api/questions, /api/ai)
│   ├── .env                     # Server configuration (PORT, MONGO_URI, GEMINI_API_KEY, JWT_SECRET)
│   └── server.js                # Express app launcher & CORS configuration
└── seed/                        # Comprehensive 10-Yr NIMCET & CAT Reasoning dataset"""
    
    dir_table = Table([[Paragraph(f"<pre>{dir_structure}</pre>", code_style)]], colWidths=[504])
    dir_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#0F172A")),
        ('TEXTCOLOR', (0,0), (-1,-1), colors.HexColor("#38BDF8")),
        ('LEFTPADDING', (0,0), (-1,-1), 12),
        ('RIGHTPADDING', (0,0), (-1,-1), 12),
        ('TOPPADDING', (0,0), (-1,-1), 10),
        ('BOTTOMPADDING', (0,0), (-1,-1), 10),
        ('ROUNDEDCORNERS', [4, 4, 4, 4])
    ]))
    story.append(dir_table)
    story.append(Spacer(1, 14))

    # SECTION 3: Required APIs & Configuration
    story.append(Paragraph("3. Required External APIs & Step-by-Step Setup", h1_style))
    story.append(Paragraph(
        "To run the application with all advanced capabilities (AI step tutor and Google Sign-In), you will need two standard free API keys. The system includes built-in fallback modes if keys are not provided immediately.",
        body_style
    ))

    # API 1: Gemini
    story.append(Paragraph("A. Google Gemini AI API (Required for AI Tutor)", h2_style))
    gemini_steps = [
        "<b>1. Visit Google AI Studio:</b> Go to <u>https://aistudio.google.com/app/apikey</u>.",
        "<b>2. Generate API Key:</b> Sign in with your Google account and click <i>Create API Key</i>.",
        "<b>3. Free Tier Limits:</b> Google provides generous free tier credits suitable for thousands of student prompt queries daily.",
        "<b>4. Add to .env:</b> Paste your key in <code>server/.env</code> under <code>GEMINI_API_KEY=AIzaSy...</code>."
    ]
    for step in gemini_steps:
        story.append(Paragraph(step, bullet_style))

    # API 2: Google OAuth
    story.append(Paragraph("B. Google OAuth 2.0 Client ID (Required for Google Sign-In)", h2_style))
    oauth_steps = [
        "<b>1. Open Google Cloud Console:</b> Visit <u>https://console.cloud.google.com/apis/credentials</u>.",
        "<b>2. Configure OAuth Consent Screen:</b> Navigate to <i>APIs & Services</i> → <i>OAuth consent screen</i>. Select <b>External</b>, name your application <i>NIMCET Prep Pro</i>, and provide your email address.",
        "<b>3. Create Credentials:</b> Click <i>+ Create Credentials</i> → <i>OAuth client ID</i>.",
        "<b>4. Set Application Type:</b> Choose <b>Web application</b>.",
        "<b>5. Authorized JavaScript Origins:</b> Add <code>http://localhost:3000</code> (and your deployment domain).",
        "<b>6. Authorized Redirect URIs:</b> Add <code>http://localhost:3000</code>.",
        "<b>7. Copy Client ID:</b> Paste in both <code>client/.env</code> (as <code>VITE_GOOGLE_CLIENT_ID</code>) and <code>server/.env</code> (as <code>GOOGLE_CLIENT_ID</code>)."
    ]
    for step in oauth_steps:
        story.append(Paragraph(step, bullet_style))
    story.append(Spacer(1, 10))

    # SECTION 4: Permissions & System Requirements
    story.append(Paragraph("4. System Permissions & Port Requirements", h1_style))
    
    perm_data = [
        [Paragraph("<b>Resource / Port</b>", body_style), Paragraph("<b>Permission Required</b>", body_style), Paragraph("<b>Reason / Purpose</b>", body_style)],
        [Paragraph("Port 5000", code_style), Paragraph("Local Inbound Binding", body_style), Paragraph("Express REST API server listener", body_style)],
        [Paragraph("Port 3000", code_style), Paragraph("Local Inbound Binding", body_style), Paragraph("Vite development server for React UI", body_style)],
        [Paragraph("Outbound HTTPS", code_style), Paragraph("Internet Access (Port 443)", body_style), Paragraph("Calling Google Gemini API and Google OAuth token verification", body_style)],
        [Paragraph("Port 27017 (Optional)", code_style), Paragraph("Local / Remote TCP", body_style), Paragraph("MongoDB connection (Memory store activates automatically if offline)", body_style)],
        [Paragraph("Local Disk / File", code_style), Paragraph("Read / Write User Directory", body_style), Paragraph("Storing cached questions and local study assets", body_style)]
    ]
    perm_table = Table(perm_data, colWidths=[120, 150, 234])
    perm_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), c_primary_dark),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('BACKGROUND', (0,1), (-1,-1), c_light_bg),
        ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E1")),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#E2E8F0")),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    for i in range(len(perm_data)):
        if i == 0:
            perm_table.setStyle(TableStyle([('TEXTCOLOR', (0,0), (-1,0), colors.white)]))
    story.append(perm_table)
    story.append(Spacer(1, 14))

    # SECTION 5: .env Files Complete Reference
    story.append(Paragraph("5. Complete .env File Reference (Ready to Copy)", h1_style))
    story.append(Paragraph(
        "Below are the complete, production-ready environment files configured for local and network operation:",
        body_style
    ))

    # Server .env
    story.append(Paragraph("Backend Configuration: <code>server/.env</code>", h2_style))
    server_env_text = """# Server Network Port
PORT=5000
NODE_ENV=development

# Database Connection (MongoDB Atlas Cloud Cluster or Local)
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.6qcjvxi.mongodb.net/nimcet_prep?retryWrites=true&w=majority&appName=NIMCET

# Authentication Security Key (Replace with any random 32+ char secret string)
JWT_SECRET=nimcet_air_1_super_secret_jwt_key_2025_elite
JWT_EXPIRE=30d

# Google Gemini AI API Key (Obtain from https://aistudio.google.com/app/apikey)
GEMINI_API_KEY=AIzaSy...your_gemini_api_key_here

# Google OAuth 2.0 Client ID (From https://console.cloud.google.com)
GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com"""

    s_env_table = Table([[Paragraph(f"<pre>{server_env_text}</pre>", code_style)]], colWidths=[504])
    s_env_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#1E293B")),
        ('TEXTCOLOR', (0,0), (-1,-1), colors.HexColor("#F8FAFC")),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('ROUNDEDCORNERS', [4, 4, 4, 4])
    ]))
    story.append(s_env_table)
    story.append(Spacer(1, 8))

    # DNS SRV Alert Box
    dns_alert = [[
        Paragraph(
            "<b>Resolved: Windows DNS SRV Error (<code>querySrv ECONNREFUSED</code>):</b><br/>"
            "On Windows, local router/ISP DNS servers often block DNS SRV lookups (<code>_mongodb._tcp...</code>). "
            "The backend has been engineered with an automated Google Public DNS resolver (<code>dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1'])</code>) "
            "directly inside <code>server/config/db.js</code>, automatically solving this connection error and enabling instant Atlas synchronization.",
            callout_style
        )
    ]]
    dns_table = Table(dns_alert, colWidths=[504])
    dns_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#ECFDF5")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#10B981")),
        ('LEFTPADDING', (0,0), (-1,-1), 12),
        ('RIGHTPADDING', (0,0), (-1,-1), 12),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('ROUNDEDCORNERS', [4, 4, 4, 4])
    ]))
    story.append(dns_table)
    story.append(Spacer(1, 10))

    # Client .env
    story.append(Paragraph("Frontend Configuration: <code>client/.env</code>", h2_style))
    client_env_text = """# Backend API Target Base URL
VITE_API_URL=http://localhost:5000/api

# Google OAuth 2.0 Web Client ID (Must match the one authorized for http://localhost:3000)
VITE_GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com"""

    c_env_table = Table([[Paragraph(f"<pre>{client_env_text}</pre>", code_style)]], colWidths=[504])
    c_env_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#1E293B")),
        ('TEXTCOLOR', (0,0), (-1,-1), colors.HexColor("#F8FAFC")),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('ROUNDEDCORNERS', [4, 4, 4, 4])
    ]))
    story.append(c_env_table)
    story.append(Spacer(1, 14))

    # SECTION 6: Profile & User Data Flow
    story.append(Paragraph("6. User Authentication & Profile Customization Flow", h1_style))
    story.append(Paragraph(
        "As specifically required, the navbar dynamically updates based on session state. Here is how user information and authentication are managed:",
        body_style
    ))

    flow_items = [
        "<b>Navbar Dynamic Replacement:</b> Before login, <i>Log In</i> and <i>Sign Up</i> buttons are visible. Once authenticated (via Email/Password or Google), these buttons are instantly removed and replaced with the user's interactive <b>Profile Avatar & Rank Badge</b>.",
        "<b>Direct Redirection:</b> Clicking the avatar redirects directly to <code>/profile</code>, where all student academic records are displayed.",
        "<b>Academic & Goal Customization:</b> Students can view and edit their <i>Target NIMCET Year</i> (2025, 2026, 2027), <i>Dream NIT Destination</i> (NIT Trichy, Surathkal, Warangal, etc.), <i>Math Foundation Level</i> (Weak to AIR 1 Elite), <i>Phone Number</i>, <i>Current College</i>, and <i>Personal Study Strategy</i>.",
        "<b>Dynamic In-Memory & MongoDB Persistence:</b> Edits are immediately saved via <code>PUT /api/auth/profile</code>, ensuring data updates are retained dynamically throughout the study session."
    ]
    for it in flow_items:
        story.append(Paragraph(f"• {it}", bullet_style))
    story.append(Spacer(1, 12))

    # SECTION 7: Setup and Launch Commands
    story.append(Paragraph("7. Quick-Start Execution Commands", h1_style))
    launch_text = """# 1. Open Terminal in the project root:
cd "C:\\Users\\Vinayak Gupta\\Desktop\\my code\\nimcet-prep-pro"

# 2. Start the Backend API Server:
cd server
npm start              # Runs on http://localhost:5000

# 3. Open a second Terminal for the Frontend Client:
cd ..\\client
npm run dev            # Runs on http://localhost:3000"""

    launch_table = Table([[Paragraph(f"<pre>{launch_text}</pre>", code_style)]], colWidths=[504])
    launch_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#0284C7")),
        ('TEXTCOLOR', (0,0), (-1,-1), colors.white),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('ROUNDEDCORNERS', [4, 4, 4, 4])
    ]))
    story.append(launch_table)
    story.append(Spacer(1, 14))

    # Closing Callout
    callout_data = [[
        Paragraph(
            "<b>AIR 1 Preparation Tip:</b> For maximum performance in NIMCET, start each session by solving 10 Calculus questions on Easy/Moderate difficulty, then switch to CAT Reasoning sets to train rapid pattern recognition under timed mock conditions.",
            callout_style
        )
    ]]
    callout_table = Table(callout_data, colWidths=[504])
    callout_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#FEF3C7")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#F59E0B")),
        ('LEFTPADDING', (0,0), (-1,-1), 12),
        ('RIGHTPADDING', (0,0), (-1,-1), 12),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('ROUNDEDCORNERS', [4, 4, 4, 4])
    ]))
    story.append(callout_table)

    # Build the PDF using NumberedCanvas
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Successfully generated: {filename}")

if __name__ == '__main__':
    target = sys.argv[1] if len(sys.argv) > 1 else "NIMCET_Prep_Pro_Documentation.pdf"
    build_pdf(target)
