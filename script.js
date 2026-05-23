/* ── Typewriter ── */
(function () {
  const el = document.getElementById('typewriter');
  const texts = ['Junior QA Engineer', 'Software QA Analyst', 'Automation Tester'];
  let textIndex = 0, charIndex = 0, isDeleting = false;

  function type() {
    const currentText = texts[textIndex];

    if (!isDeleting) {
      el.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(type, 2000);
        return;
      }
      setTimeout(type, 60);
    } else {
      el.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(type, 400);
        return;
      }
      setTimeout(type, 30);
    }
  }
  type();
})();

/* ── Elegant Minimal Scroll Reveal (Triggers every scroll) ── */
(function () {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
      } else {
        // Resets the visible class when elements scroll out of viewport
        e.target.classList.remove('visible');
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
})();

/* ── Animated Counters (Runs repetitively with ultra-smooth 2.2s quartic ease) ── */
(function () {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      const el = e.target;
      const target = parseFloat(el.dataset.target);
      const isDecimal = el.dataset.decimal === 'true';

      if (e.isIntersecting) {
        // Prevent duplicate concurrent loop registrations
        if (el.dataset.animating === 'true') return;
        el.dataset.animating = 'true';

        const duration = 2200; // Eased duration for rich visual feedback (2.2 seconds)
        const start = performance.now();

        function update(now) {
          if (el.dataset.animating !== 'true') return;

          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);

          // quartic easeOut curve (starts swift, slows down beautifully)
          const eased = 1 - Math.pow(1 - progress, 4);
          const current = eased * target;

          el.textContent = isDecimal ? current.toFixed(2) : Math.floor(current) + '+';

          if (progress < 1) {
            requestAnimationFrame(update);
          } else {
            el.dataset.animating = 'false';
          }
        }
        requestAnimationFrame(update);
      } else {
        // Reset count and set animating flag to false when scrolling away
        el.dataset.animating = 'false';
        el.textContent = isDecimal ? '0.00' : '0+';
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.stat-number[data-target]').forEach(el => obs.observe(el));
})();

/* ── High-Performance Asynchronous Active Nav Tracker ── */
(function () {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const navObserver = new IntersectionObserver((entries) => {
    // Find the current intersecting section
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(a => {
          if (a.getAttribute('href') === '#' + id) {
            a.classList.add('active');
          } else {
            a.classList.remove('active');
          }
        });
      }
    });
  }, {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  });

  sections.forEach(s => navObserver.observe(s));
})();

/* ── Mobile Menu (Handled in consolidated function below) ── */

/* ── Smooth Scroll & Mobile Menu Close Coordination ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href === '#' || !href) return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const navLinks = document.getElementById('navLinks');
      const hamburger = document.getElementById('hamburger');
      if (navLinks && navLinks.classList.contains('active')) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('nav-active');
        document.body.style.overflow = '';
      }
      
      setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  });
});

/* ── Dynamic Stats Integration (GitHub API & Project DOM Count) ── */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.stat-card').forEach(card => {
    const labelEl = card.querySelector('.stat-label');
    const numEl = card.querySelector('.stat-number');
    if (!labelEl || !numEl) return;
    
    const label = labelEl.textContent.trim().toLowerCase();
    if (label === 'projects') {
      const projectCount = document.querySelectorAll('.project-card').length;
      if (projectCount > 0) numEl.setAttribute('data-target', projectCount);
    } else if (label === 'repositories') {
      fetch('https://api.github.com/users/TheSourav-001')
        .then(response => {
          if (!response.ok) throw new Error('Network error');
          return response.json();
        })
        .then(data => {
          if (data && typeof data.public_repos === 'number') {
            numEl.setAttribute('data-target', data.public_repos);
          }
        })
        .catch(err => {
          console.log('GitHub API offline or ratelimited, using fallback.');
        });
    }
  });
});

/* ── Insights & Articles Arrow Navigation ── */
(function () {
  const grid = document.querySelector('.articles-grid');
  const prevBtn = document.querySelector('.art-prev');
  const nextBtn = document.querySelector('.art-next');

  if (grid && prevBtn && nextBtn) {
    const getScrollAmount = () => {
      const firstCard = grid.querySelector('.article-card');
      if (firstCard) {
        return firstCard.offsetWidth + 20; // Card width + gap
      }
      return 300;
    };

    prevBtn.addEventListener('click', () => {
      grid.scrollBy({
        left: -getScrollAmount(),
        behavior: 'smooth'
      });
    });

    nextBtn.addEventListener('click', () => {
      grid.scrollBy({
        left: getScrollAmount(),
        behavior: 'smooth'
      });
    });
  }
})();

/* ── Elegant Brand Preloader (3s Minimum Display) ── */
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('fade-out');
    }, 3000);
  }
});

/* ── Insights & Articles Rich Reader Modal ── */
(function () {
  const articlesData = {
    "api-testing": {
      tag: "API Testing",
      readTime: "4 Min Read",
      title: "Best Practices for API Testing",
      content: `
        <p>In modern software development, APIs play a critical role in connecting different systems, applications, and services. Whether it is a mobile app communicating with a server, an e-commerce website processing payments, or a social media platform loading user data, APIs work silently behind the scenes to make everything function properly. Because APIs are responsible for handling communication and data exchange, ensuring their reliability and performance is extremely important. This is where API testing becomes essential.</p>
        <p>API testing is the process of validating that an Application Programming Interface behaves correctly, securely, and efficiently under different conditions. Unlike UI testing, API testing focuses on the backend logic, business rules, request handling, and response validation. A well-tested API helps improve software quality, stability, and user experience.</p>
        <p>However, simply sending requests and checking response codes is not enough. Professional API testing requires proper planning, structured validation, and real-world testing strategies. Following best practices can significantly improve testing quality and reduce production-level issues.</p>
        
        <h3>Understanding the Purpose of API Testing</h3>
        <p>Before writing test cases or using tools like Postman, it is important to understand why API testing matters. APIs act as the communication layer between systems. If an API fails, multiple features of an application may stop working even if the user interface appears fine.</p>
        <p>For example, a login API failure can prevent users from accessing an application entirely. A broken payment API can stop online purchases. Because APIs directly impact functionality, performance, and security, they must be tested carefully.</p>
        <p>API testing primarily focuses on:</p>
        <ul>
          <li>Functionality validation</li>
          <li>Data accuracy</li>
          <li>Security verification</li>
          <li>Error handling</li>
          <li>Response consistency</li>
          <li>Performance and scalability</li>
        </ul>
        <p>A strong API testing strategy ensures that systems communicate correctly under both normal and abnormal conditions.</p>

        <h3>Always Validate Status Codes Properly</h3>
        <p>One of the most common beginner mistakes is checking only whether an API returns a response. Professional QA engineers go beyond that and validate the correctness of HTTP status codes.</p>
        <p>Different status codes indicate different situations:</p>
        <ul>
          <li><strong>200 OK:</strong> Successful request execution.</li>
          <li><strong>201 Created:</strong> Successful resource creation (e.g. POST requests).</li>
          <li><strong>400 Bad Request:</strong> Client-side input validation failure.</li>
          <li><strong>401 Unauthorized:</strong> Missing or incorrect authentication credentials.</li>
          <li><strong>403 Forbidden:</strong> Correct credentials but insufficient user role permissions.</li>
          <li><strong>404 Not Found:</strong> The requested endpoint resource does not exist.</li>
          <li><strong>500 Internal Server Error:</strong> Unhandled server-side application errors.</li>
        </ul>
        <p>A proper API test should verify whether the returned status code matches the expected behavior. For example, if invalid credentials are submitted but the API still returns 200 OK, that may indicate poor validation or security issues.</p>

        <h3>Validate Response Body and Data Accuracy</h3>
        <p>Receiving a successful status code does not guarantee that the API is functioning correctly. QA engineers must also validate the response body carefully.</p>
        <p>The response should contain correct fields, proper data types, accurate values, and the expected JSON/XML structure. For example, if a product API returns incorrect prices or missing product IDs, the frontend application may behave incorrectly even though the API technically responded successfully.</p>
        <p>Response validation should include JSON schema validation, required field verification, data integrity checks, null or empty field checks, and data formatting validation. Modern API testing tools like Postman allow automated assertions that help validate responses more efficiently.</p>

        <h3>Perform Negative Testing</h3>
        <p>Many QA beginners focus only on positive test scenarios where valid input is provided. However, real-world users often make mistakes, enter invalid data, or behave unexpectedly. This is why negative testing is one of the most important API testing practices.</p>
        <p>Negative testing verifies how the API behaves under invalid or unexpected conditions. Examples include: invalid authentication tokens, missing required fields, incorrect request formats, invalid query parameters, wrong endpoint access, and unsupported HTTP methods. A good API should handle invalid situations gracefully without crashing or exposing sensitive information.</p>

        <h3>Test Authentication and Authorization Thoroughly</h3>
        <p>Security testing is a major part of API testing because APIs often expose sensitive business logic and user data. Modern applications use authentication systems such as JWT tokens, OAuth, API keys, and session tokens.</p>
        <p>QA engineers should verify: valid token access, expired token handling, invalid token rejection, permission-based access control, and role-based authorization. For example, a normal user should not be able to access admin-level APIs. If role validation is weak, it can create serious security vulnerabilities.</p>

        <h3>Use Automation for Repetitive API Testing</h3>
        <p>Manual API testing is useful during early development and exploratory validation. However, repetitive API testing quickly becomes time-consuming as projects grow larger. Automation helps save time, improve consistency, reduce repetitive work, and support CI/CD pipelines. Tools like Postman, Newman, Rest Assured, Selenium, and JMeter can automate API workflows and generate reports automatically.</p>

        <h3>Verify Error Messages Carefully</h3>
        <p>Error messages are often ignored during API testing, but they play an important role in usability and debugging. Good API error responses should be clear and understandable, avoid exposing sensitive server details, and help identify the problem quickly. APIs should never expose internal database information, server paths, or stack traces because these can create security risks.</p>

        <h3>Include Performance Testing</h3>
        <p>Functional correctness alone is not enough. APIs should also perform efficiently under different traffic conditions. Performance testing helps identify slow response times, server bottlenecks, memory leaks, and scalability limitations. Tools like Apache JMeter can simulate multiple concurrent users and measure throughput, response time, error rates, and system stability.</p>

        <h3>Maintain Well-Structured Test Cases</h3>
        <p>A professional QA process always includes proper documentation and organized test cases. Good API test cases should clearly define the test scenario, request method, endpoint, input data, expected response, and validation criteria. Structured documentation becomes especially valuable in Agile teams where multiple testers and developers collaborate frequently.</p>

        <h3>Collaborate Closely with Developers</h3>
        <p>API testing becomes more effective when QA engineers communicate actively with developers. Understanding API workflows, business logic, validation rules, and error handling expectations helps testers design stronger test cases. QA should not work separately from development teams; strong collaboration improves overall software quality.</p>

        <h3>Keep Learning Modern API Technologies</h3>
        <p>API technologies evolve continuously. Modern QA engineers should stay updated with REST APIs, GraphQL, microservices architecture, CI/CD integration, API security concepts, and cloud-based testing. Continuous learning is one of the strongest qualities of successful QA professionals.</p>

        <h3>Conclusion</h3>
        <p>API testing is much more than sending requests and checking responses. It requires careful validation, security awareness, structured testing strategies, and continuous improvement. By following best practices such as validating status codes, performing negative testing, automating scenarios, and conducting performance testing, QA engineers can significantly improve software reliability and reduce production risks.</p>
      `
    },
    "manual-vs-auto": {
      tag: "Concepts",
      readTime: "6 Min Read",
      title: "Manual vs Automation Testing",
      content: `
        <p>Software testing is one of the most important parts of software development because even a small bug can create serious problems for users and businesses. In modern software quality assurance, two major testing approaches are widely used: Manual Testing and Automation Testing. Both play a critical role in ensuring software quality, stability, and performance.</p>
        <p>Many beginners often ask which one is better between manual and automation testing. The truth is that neither completely replaces the other. Instead, both approaches work together to create a strong and effective testing process. Understanding the differences, advantages, limitations, and real-world usage of both testing methods is essential for every QA engineer.</p>

        <h3>What is Manual Testing?</h3>
        <p>Manual testing is the process of testing software manually without using automated scripts or tools to execute test cases. In this approach, a QA engineer interacts directly with the application like a real user to identify bugs, validate features, and verify expected behavior.</p>
        <p>The tester performs actions such as: clicking buttons, filling forms, navigating pages, validating UI elements, checking workflows, and comparing expected vs actual results. Manual testing focuses heavily on human observation, logical thinking, and user experience evaluation.</p>
        <p>For example, when testing an e-commerce website manually, a tester may: add products to cart, apply discount coupons, complete checkout, validate order confirmation, and check UI responsiveness. This approach helps identify real-world usability issues that automated tools may not easily detect.</p>

        <h3>Advantages of Manual Testing</h3>
        <p>One of the biggest advantages of manual testing is flexibility. Testers can quickly adapt to UI changes, business logic updates, or unexpected application behavior without needing to modify scripts.</p>
        <p>Manual testing is highly effective for:</p>
        <ul>
          <li>Exploratory testing</li>
          <li>Usability testing</li>
          <li>UI/UX validation</li>
          <li>Ad-hoc testing</li>
          <li>Early-stage feature testing</li>
        </ul>
        <p>Human observation is extremely valuable in these scenarios because testers can notice visual inconsistencies, confusing workflows, or unexpected user experience problems. Manual testing also requires lower initial setup compared to automation, allowing beginners to start testing applications immediately without advanced programming knowledge.</p>

        <h3>Limitations of Manual Testing</h3>
        <p>Although manual testing is important, it has several limitations. One major challenge is that repetitive testing becomes time-consuming and tiring. For example, repeatedly testing login functionality after every update can waste significant time. Manual testing also becomes less efficient in large-scale projects where hundreds or thousands of test cases need execution repeatedly. Since it depends on people, mistakes can happen due to fatigue, missed scenarios, or inconsistent execution.</p>

        <h3>What is Automation Testing?</h3>
        <p>Automation testing is the process of using scripts, frameworks, and testing tools to execute test cases automatically without manual intervention. Instead of manually performing actions, QA engineers write automated scripts that simulate user interactions and validate expected outcomes.</p>
        <p>Automation tools can open browsers, click buttons, fill forms, send API requests, validate responses, and compare expected results automatically. Popular automation tools include Selenium WebDriver, Postman, Newman, Cypress, JUnit, TestNG, and Apache JMeter.</p>

        <h3>Advantages of Automation Testing</h3>
        <p>The biggest advantage of automation testing is speed. Automated scripts execute much faster than manual testing and can run continuously without human involvement. Automation is highly valuable for regression testing, smoke testing, repetitive workflows, CI/CD pipelines, and large-scale testing.</p>
        <p>Automation also improves consistency. Scripts perform the same steps accurately every time, reducing human error. Another major benefit is reusability. Once automation scripts are created properly, they can be reused multiple times across different builds and releases, supporting parallel execution and maximizing efficiency in Agile and DevOps environments.</p>

        <h3>Limitations of Automation Testing</h3>
        <p>Despite its advantages, automation testing also has limitations. One major challenge is the initial setup cost. Building frameworks, writing scripts, and maintaining automation infrastructure requires time and technical expertise. Automation scripts also require maintenance whenever UI changes occur, business logic changes, locators are updated, or workflows are modified.</p>
        <p>Another limitation is that automation cannot fully replace human thinking. Automated scripts follow predefined steps but cannot easily evaluate visual design quality, user friendliness, or unexpected behavior. It is also less effective for exploratory testing where creativity and observation are important.</p>

        <h3>Key Differences Between Manual and Automation Testing</h3>
        <ul>
          <li><strong>Execution Method:</strong> Manual testing is performed by humans, while automation testing is performed using scripts and tools.</li>
          <li><strong>Speed:</strong> Manual testing is slower, whereas automation testing is much faster.</li>
          <li><strong>Human Involvement:</strong> Manual testing requires continuous human interaction; automation runs automatically after setup.</li>
          <li><strong>Best Use Cases:</strong> Manual is best for exploratory, UI, and usability testing. Automation is best for regression, performance, and repetitive suites.</li>
          <li><strong>Accuracy:</strong> Manual testing may involve human error; automation provides consistent execution.</li>
        </ul>

        <h3>Why Modern QA Requires Both</h3>
        <p>One of the biggest misconceptions among beginners is thinking automation testing can completely replace manual testing. In reality, successful QA teams combine both approaches strategically. Manual testing helps discover unexpected bugs, usability issues, and real user experience problems, while automation testing improves speed, increases coverage, and supports continuous delivery.</p>
        <p>Together, they create a balanced and effective testing process. A strong QA engineer understands what should be automated, what should remain manual, and when each approach is most effective.</p>

        <h3>Conclusion</h3>
        <p>Manual testing and automation testing are not competitors. They are complementary approaches that work together to improve software quality. Manual testing provides flexibility, human observation, and real user perspective, while automation testing improves speed, efficiency, and consistency for repetitive tasks. The most effective QA strategy combines both approaches based on project requirements, timelines, and business goals.</p>
      `
    },
    "selenium-framework": {
      tag: "Automation",
      readTime: "8 Min Read",
      title: "How I Built My Selenium Framework",
      content: `
        <p>In modern test automation, building a reliable, scalable, and maintainable framework is key to successful software QA. When I designed my custom automation framework, I selected a powerful combination of <strong>Java, Selenium WebDriver, TestNG, and Maven</strong>, wrapped with a <strong>Page Object Model (POM)</strong> design pattern. This architecture ensures low maintenance costs, readable test scripts, and maximum code reusability.</p>
        
        <h3>1. Selecting the Right Tech Stack</h3>
        <p>Choosing a mature tech stack is crucial. Java provides excellent object-oriented capabilities and massive community support. Maven handles dependency management and builds processes seamlessly, while TestNG manages test executions, groups, parameters, and assertions. Selenium WebDriver interacts directly with browsers via native events, ensuring high accuracy.</p>

        <h3>2. Implementing the Page Object Model (POM)</h3>
        <p>To prevent duplicate locator code and messy scripts, POM separates page representations from actual test verification. Every webpage has a corresponding class where WebElements are located (using @FindBy annotations) and page-specific actions are defined as modular methods. Test scripts then call these page methods, keeping tests incredibly clean and easy to maintain when UI changes occur.</p>
        
        <h3>3. Robust Wait Strategies and Synchronization</h3>
        <p>One of the biggest issues in automation is test flakiness due to dynamic page loading. My framework avoids hardcoded thread sleep statements. Instead, it utilizes custom wrappers for <strong>WebDriverWait (ExpectedConditions)</strong>, dynamically synchronizing tests until elements are clickable, visible, or loaded. This dramatically improved execution reliability.</p>

        <h3>4. Data-Driven Capabilities and Reporting</h3>
        <p>A great framework supports testing multiple datasets without script duplication. Using TestNG's <strong>@DataProvider</strong>, the framework parses parameters dynamically. For visual feedback, it integrates <strong>Extent Reports</strong>, which captures detailed steps, execution times, and automated screenshots on test failure. These HTML reports are generated automatically and shared with development teams.</p>

        <h3>5. Conclusion</h3>
        <p>Building this Selenium framework taught me the importance of modularity, data separation, and robust element synchronization. It reduced execution time by 40% and simplified test maintenance, demonstrating the absolute value of structured test automation in enterprise systems.</p>
      `
    },
    "qa-mistakes": {
      tag: "Career",
      readTime: "5 Min Read",
      title: "Common QA Mistakes",
      content: `
        <p>Entering the field of Software Quality Assurance is exciting, but it also comes with a steep learning curve. Even seasoned testers sometimes fall into common traps that can let critical bugs escape to production. By identifying these common mistakes early, we can shift from basic verification to high-level, premium quality assurance.</p>

        <h3>Mistake 1: Testing Only the Happy Path</h3>
        <p>The "happy path" is the ideal scenario where valid inputs are entered and processes complete without error. Beginner QA engineers often focus entirely on this path. However, real-world users rarely follow ideal paths. Professional QA focuses heavily on edge cases, negative bounds, missing inputs, and boundary values where system vulnerabilities hide.</p>

        <h3>Mistake 2: Writing Ambiguous Bug Reports</h3>
        <p>A bug report is a professional QA deliverable. Writing "Login page is broken" is completely useless to developers. A professional QA engineer writes a comprehensive report featuring a descriptive title, exact Steps to Reproduce (S2R), environment specifications (OS, browser), actual vs. expected results, screenshots, and system logs. This speeds up bug resolution tremendously.</p>

        <h3>Mistake 3: Relying Solely on Automation</h3>
        <p>Automation is incredibly fast and efficient for repetitive regression tasks, but it is not creative. Automation scripts only test what they are coded to verify. They cannot identify visual layout bugs, confusing user experiences, or logically explore a system's unexpected behaviors. Exploratory and manual usability testing remain crucial.</p>

        <h3>Mistake 4: Not Understanding the Underlying Architecture</h3>
        <p>A common beginner mistake is testing software as a pure "black box" without knowing how the data flows. Understanding databases, APIs, network requests, and system logs allows a tester to pinpoint exactly where an issue is occurring (e.g. backend database constraint vs frontend styling error), facilitating faster debugging.</p>

        <h3>Conclusion</h3>
        <p>Avoiding these QA mistakes separates a junior tester from an elite Quality Assurance Professional. By emphasizing comprehensive negative testing, detail-rich bug reports, and a deep architectural understanding, QA engineers ensure that systems are truly bulletproof and deliver a phenomenal user experience.</p>
      `
    },
    "bug-reporting": {
      tag: "Bug Reporting",
      readTime: "5 Min Read",
      title: "Why Bug Reporting Skills Matter in QA",
      content: `
        <p>In the software development lifecycle, a QA engineer's primary output is not just finding bugs, but communicating them effectively. A bug report is a professional document that bridges the gap between testing and development. When a bug report is vague, incomplete, or hard to read, it leads to endless back-and-forth communication, slow fixes, and developer frustration.</p>

        <h3>What Makes a Perfect Bug Report?</h3>
        <p>A perfect bug report should contain all the crucial information a developer needs to understand, reproduce, and fix the issue immediately without further questions.</p>

        <h3>1. A Clear, Descriptive Title</h3>
        <p>The title should briefly summarize the bug, its location, and the impact. For example: "Checkout: Application crashes when attempting to place order with an expired credit card" is far better than "Checkout crash".</p>

        <h3>2. Detailed Steps to Reproduce (S2R)</h3>
        <p>S2R must be written sequentially and clearly. Never assume the reader knows how you got there. List every action, click, and page navigation step-by-step.</p>

        <h3>3. Clear Environment Specifications</h3>
        <p>Bugs are often platform-specific. Explicitly mention the OS version, browser version, device name, and application environment (staging, production, etc.) where the bug occurred.</p>

        <h3>4. Explicit Actual vs. Expected Results</h3>
        <p>Clearly state what the system is currently doing versus what the system should be doing according to the functional requirements. This eliminates any ambiguity.</p>

        <h3>5. Contextual Evidence (Logs, Screenshots, Videos)</h3>
        <p>A picture is worth a thousand words, and a system log is worth a thousand screenshots. Always attach console error screenshots, network payload captures, or screen recordings showing the issue live.</p>

        <h3>Conclusion</h3>
        <p>Strong bug reporting is a superpower. It builds immense trust and respect between QA engineers and development teams, accelerates resolution cycles, and ensures the product launches with absolute confidence.</p>
      `
    },
    "regression-testing": {
      tag: "Regression Testing",
      readTime: "7 Min Read",
      title: "Importance of Regression Testing in Software QA",
      content: `
        <p>In fast-paced agile development cycles, new features are pushed to codebases continuously. However, every new code change, bug fix, or configuration update carries the risk of accidentally breaking existing, perfectly working features. This is where regression testing acts as the ultimate safety net for software quality.</p>

        <h3>What is Regression Testing?</h3>
        <p>Regression testing is the process of executing a suite of test cases against an updated application build to verify that recent code changes have not introduced new defects or broken existing functionality. It guarantees that the system remains stable and that unchanged features behave as expected.</p>

        <h3>Why is it Crucial in Agile Development?</h3>
        <p>In Agile teams, software is built incrementally. Continuous deployment means that the core code is modified constantly. Without rigorous regression testing, a fix for one module could silently break an entirely different part of the system (e.g. updating the registration page breaks the user profile page).</p>

        <h3>Automated vs. Manual Regression Testing</h3>
        <p>Because regression testing involves repeatedly running the same test cases, it is the prime candidate for automation. Running a regression suite of 300 test cases manually before every minor release is exhausting and prone to human error. Automated regression suites can execute overnight and immediately flag failures, letting manual testers focus on exploratory testing of new features.</p>

        <h3>Effective Strategies for Regression Suite Management</h3>
        <p>A common mistake is simply adding every new test case to the regression suite, making it bloated and slow. Best practices include: categorizing test cases by impact, building a tiered suite (smoke tests for fast sanity checks, full regression for major releases), and regularly cleaning out obsolete or redundant tests.</p>

        <h3>Conclusion</h3>
        <p>Regression testing is the key to maintaining stable, high-quality software over time. Balancing automated script suites with targeted manual checks ensures that codebase expansions never compromise user experience or system integrity.</p>
      `
    }
  };

  const modal = document.getElementById('article-reader-modal');
  const modalBody = document.getElementById('modal-body-content');
  const closeBtn = document.getElementById('modal-close-btn');

  if (modal && modalBody && closeBtn) {
    // Open Modal function
    function openArticle(id) {
      const data = articlesData[id];
      if (!data) return;

      // Populate article content dynamically with rich formatting
      modalBody.innerHTML = `
        <span class="reader-article-tag">${data.tag}</span>
        <h1 class="reader-title">${data.title}</h1>
        <div class="reader-meta">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            ${data.readTime}
          </span>
          <span>•</span>
          <span>Published by Sourav Dipto Apu</span>
        </div>
        <div class="reader-body">
          ${data.content}
        </div>
      `;

      // Prevent background scrolling
      document.body.style.overflow = 'hidden';

      // Open modal
      modal.classList.add('active');
    }

    // Close Modal function
    function closeArticle() {
      modal.classList.remove('active');
      document.body.style.overflow = '';
      // Clear content after animation
      setTimeout(() => {
        modalBody.innerHTML = '';
      }, 400);
    }

    // Attach click events to article cards
    document.querySelectorAll('.article-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-article-id');
        if (id) openArticle(id);
      });
    });

    // Close on button click
    closeBtn.addEventListener('click', closeArticle);

    // Close on background click
    modal.querySelector('.modal-backdrop').addEventListener('click', closeArticle);

    // Close on Escape key press
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeArticle();
      }
    });
  }
})();

/* ── Consolidated Hamburger Menu Toggle with Body Scroll Lock ── */
(function () {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  function toggleMenu(forceClose = false) {
    if (forceClose) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.classList.remove('nav-active');
      document.body.style.overflow = '';
    } else {
      const isActive = navLinks.classList.toggle('active');
      hamburger.classList.toggle('active', isActive);
      document.body.classList.toggle('nav-active', isActive);
      if (isActive) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  }

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // Close menu when clicking a link
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        toggleMenu(true);
      });
    });

    // Close on menu clicking outside
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('active')) {
        toggleMenu(true);
      }
    });
  }
})();

/* ── QA Process Workflow Dynamic SVG Connections ── */
(function () {
  const container = document.querySelector('.workflow-network-wrapper');
  const svg = document.getElementById('workflow-svg-connections');

  if (!container || !svg) return;

  const bgLinesGroup = document.getElementById('svg-bg-lines');
  const flowPathsGroup = document.getElementById('svg-flow-paths');
  const packetsGroup = document.getElementById('svg-packets');
  const coreHub = document.getElementById('workflow-core');

  const steps = [];
  for (let i = 1; i <= 7; i++) {
    const el = document.getElementById(`wf-step-${i}`);
    if (el) steps.push(el);
  }

  function getElementCenter(el, parentRect) {
    const rect = el.getBoundingClientRect();
    return {
      x: rect.left - parentRect.left + rect.width / 2,
      y: rect.top - parentRect.top + rect.height / 2
    };
  }

  function updateConnections() {
    // If screen is smaller than 1025px (tablet or mobile), don't draw lines
    if (window.innerWidth <= 1024) {
      bgLinesGroup.innerHTML = '';
      flowPathsGroup.innerHTML = '';
      packetsGroup.innerHTML = '';
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const coreCenter = getElementCenter(coreHub, containerRect);
    const stepCenters = steps.map(step => getElementCenter(step, containerRect));

    // 1. Draw background star lines connecting core to each card
    let bgLinesHTML = '';
    stepCenters.forEach((pt) => {
      bgLinesHTML += `<line x1="${coreCenter.x}" y1="${coreCenter.y}" x2="${pt.x}" y2="${pt.y}" stroke="rgba(167, 139, 250, 0.45)" stroke-width="1.5" stroke-dasharray="4 6" class="glow-path-bg" />`;
    });
    bgLinesGroup.innerHTML = bgLinesHTML;

    // 2. Draw sequential path: Step 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7
    let pathD = `M ${stepCenters[0].x} ${stepCenters[0].y}`;
    for (let i = 1; i < stepCenters.length; i++) {
      pathD += ` L ${stepCenters[i].x} ${stepCenters[i].y}`;
    }

    // Create base path and flowing path
    flowPathsGroup.innerHTML = `
      <!-- Base connection track -->
      <path d="${pathD}" stroke="rgba(167, 139, 250, 0.15)" stroke-width="2" fill="none" />
      <!-- Glowing pulsing pulse lines -->
      <path id="seq-flow-track" d="${pathD}" stroke="url(#flow-gradient)" stroke-width="3" fill="none" opacity="0.8" />
    `;

    // Make sure we have a gradient definition in the SVG
    if (!svg.querySelector('defs')) {
      svg.insertAdjacentHTML('afterbegin', `
        <defs>
          <linearGradient id="flow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#8b5cf6" stop-opacity="0.2" />
            <stop offset="50%" stop-color="#c084fc" stop-opacity="1" />
            <stop offset="100%" stop-color="#8b5cf6" stop-opacity="0.2" />
          </linearGradient>
          <filter id="packet-glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
      `);
    }

    // 3. Inject glowing packets (SVG circles) moving along the sequential path using <animateMotion>
    const duration = 8.5; // slow, beautiful cinematic flow
    const packetCount = 4;
    let packetsHTML = '';

    for (let i = 0; i < packetCount; i++) {
      const delay = (duration / packetCount) * i;
      packetsHTML += `
        <circle r="4.5" fill="#c084fc" filter="url(#packet-glow)" opacity="0.9">
          <animateMotion 
            dur="${duration}s" 
            begin="${delay}s" 
            repeatCount="indefinite" 
            path="${pathD}" />
        </circle>
      `;
    }
    packetsGroup.innerHTML = packetsHTML;
  }

  // Draw initially and add listeners
  // Wait slightly to let document render fully and cards settle
  setTimeout(updateConnections, 500);

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(updateConnections, 150);
  });
})();
// ==========================================
// REAL GITHUB DATA FETCHER WITH PROXY FALLBACK
// ==========================================
async function loadRealGitHubData(year, btnElement) {
    // 1. Update UI state
    document.querySelectorAll('.year-btn').forEach(btn => btn.classList.remove('active'));
    if (btnElement) btnElement.classList.add('active');

    const container = document.getElementById('contrib-scroll-wrapper');
    container.innerHTML = '<div class="loading-state"><div class="spinner"></div> Fetching real GitHub data...</div>';

    const username = 'TheSourav-001';
    let targetUrl = `https://github.com/users/${username}/contributions`;
    if (year !== 'last_year') {
        targetUrl += `?from=${year}-01-01&to=${year}-12-31`;
    }

    // 2. Multi-Proxy System
    const proxies = [
        `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(targetUrl)}`,
        `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`,
        `https://corsproxy.io/?url=${encodeURIComponent(targetUrl)}`
    ];

    let htmlData = null;

    for (const proxy of proxies) {
        try {
            const response = await fetch(proxy);
            if (response.ok) {
                const text = await response.text();
                if (text && text.includes('ContributionCalendar-grid')) {
                    htmlData = text;
                    break;
                }
            }
        } catch (error) {
            console.warn(`Proxy ${proxy} failed, trying next...`);
        }
    }

    if (!htmlData) {
        container.innerHTML = '<div style="color: #ef4444; font-size: 13px; padding: 20px;">All data servers are busy right now. Please refresh the page in a few minutes.</div>';
        return;
    }

    // 3. Process and Clean the HTML Data
    try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlData, 'text/html');

        const table = doc.querySelector('.ContributionCalendar-grid');
        if (!table) throw new Error("Could not find grid in fetched HTML.");

        // Map GitHub's native tooltips
        const tooltips = doc.querySelectorAll('tool-tip');
        const tooltipMap = {};
        tooltips.forEach(t => {
            const id = t.getAttribute('for');
            if (id) tooltipMap[id] = t.textContent.trim();
        });

        // Customize the cells
        const cells = table.querySelectorAll('.ContributionCalendar-day, td.ContributionCalendar-day');
        cells.forEach(cell => {
            const id = cell.getAttribute('id');
            const dateAttr = cell.getAttribute('data-date');
            const level = parseInt(cell.getAttribute('data-level') || '0');

            let tooltipText = id ? tooltipMap[id] : null;
            if (!tooltipText) {
                const srOnly = cell.querySelector('.sr-only');
                if (srOnly) tooltipText = srOnly.textContent.trim();
            }
            if (!tooltipText) {
                tooltipText = level > 0 ? `Contributions on ${dateAttr}` : `No contributions on ${dateAttr}`;
            }

            // Remove native text to prevent layout breaking
            cell.innerHTML = '';

            // Add Custom Tooltip
            const tooltipEl = document.createElement('div');
            tooltipEl.className = 'gh-tooltip';
            tooltipEl.textContent = tooltipText;
            cell.appendChild(tooltipEl);

            // Add Independent Glowing Blinking Animation for active commits
            if (level >= 1) {
                const blinkClasses = ['blink-1', 'blink-2', 'blink-3', 'blink-4'];
                const randomClass = blinkClasses[Math.floor(Math.random() * blinkClasses.length)];
                cell.classList.add(randomClass);
            }
        });

        // Correct alignment issue and enforce 3-letter words for Day/Month labels
        const rows = table.querySelectorAll('tr');
        rows.forEach(row => {
            const label = row.querySelector('.ContributionCalendar-label');
            if (label) {
                label.style.verticalAlign = 'bottom';
            }
        });

        const labels = table.querySelectorAll('.ContributionCalendar-label');
        labels.forEach(lbl => {
            if (lbl.textContent) {
                const trimmed = lbl.textContent.trim();
                if (trimmed.length > 3) {
                    lbl.textContent = trimmed.substring(0, 3);
                }
            }
        });

        // Find Total Contributions
        let total = 0;
        const h2 = doc.querySelector('h2.f4');
        if (h2) {
            const match = h2.textContent.match(/([\d,]+)\s+contributions/);
            if (match) {
                total = parseInt(match[1].replace(/,/g, ''));
            }
        }

        container.innerHTML = '';
        container.appendChild(table);

        animateValue("total-contribs", parseInt(document.getElementById("total-contribs").innerText) || 0, total, 1000);

    } catch (error) {
        console.error("Error parsing GitHub data:", error);
        container.innerHTML = '<div style="color: #ef4444; font-size: 13px; padding: 20px;">Error parsing GitHub grid. Please try again.</div>';
    }
}

// Feature: Load Total Contributions across all years
async function loadTotalContributions(btnElement) {
    document.querySelectorAll('.year-btn').forEach(btn => btn.classList.remove('active'));
    if (btnElement) btnElement.classList.add('active');

    const container = document.getElementById('contrib-scroll-wrapper');
    container.innerHTML = '<div class="loading-state"><div class="spinner"></div> Fetching total contributions...</div>';

    try {
        const response = await fetch('https://github-readme-stats.vercel.app/api?username=TheSourav-001');
        const svgText = await response.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(svgText, 'image/svg+xml');

        let total = 0;
        const texts = doc.querySelectorAll('text');
        for (let i = 0; i < texts.length; i++) {
            if (texts[i].textContent.includes('Total Commits')) {
                const nextText = texts[i].nextElementSibling || texts[i + 1];
                if (nextText) {
                    total = parseInt(nextText.textContent.replace(/,/g, ''));
                }
                break;
            }
        }

        if (total === 0) total = 250;

        animateValue("total-contribs", parseInt(document.getElementById("total-contribs").innerText) || 0, total, 1000);

        await loadRealGitHubData('last_year', null);

        document.querySelector('.graph-title').innerHTML = `<strong id="total-contribs">${total}</strong> total contributions (Lifetime)`;

    } catch (e) {
        console.error("Error fetching total", e);
        loadRealGitHubData('last_year', document.querySelector('.year-btn[onclick*="last_year"]'));
    }
}

// Animated Number Logic
function animateValue(id, start, end, duration) {
    const obj = document.getElementById(id);
    if (!obj) return;
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
}

// Initialize GitHub Activity on page load
window.addEventListener('DOMContentLoaded', () => {
    loadRealGitHubData('last_year', document.querySelector('.year-btn.active'));
});

/* ── QA Evidence Workspace Navigation & Preview Module ── */
(function () {
  const WORKSPACE_DATA = [
    {
      name: "All Bug report",
      type: "folder",
      desc: "Defect logs with S2R, severity maps",
      children: [
        { name: "All Bug.csv", type: "file", ext: ".csv", path: "QA Evidence Gallery/All Bug report/All Bug.csv" },
        { name: "All Bug.png", type: "file", ext: ".png", path: "QA Evidence Gallery/All Bug report/All Bug.png" },
        { name: "Bug list detlais.pdf", type: "file", ext: ".pdf", path: "QA Evidence Gallery/All Bug report/Bug list detlais.pdf" }
      ]
    },
    {
      name: "All TestCase",
      type: "folder",
      desc: "Functional, boundary, and negative matrices",
      children: [
        { name: "(TestCase and Execution).xlsx", type: "file", ext: ".xlsx", path: "QA Evidence Gallery/All TestCase/(TestCase and Execution).xlsx" },
        { name: "Test Analysis Feedback.docx", type: "file", ext: ".docx", path: "QA Evidence Gallery/All TestCase/Test Analysis Feedback.docx" },
        { name: "Test_Cases_Petstore_v1.0.pdf", type: "file", ext: ".pdf", path: "QA Evidence Gallery/All TestCase/Test_Cases_Petstore_v1.0.pdf" },
        { name: "Testrail-activity-01-01-2026.xlsx", type: "file", ext: ".xlsx", path: "QA Evidence Gallery/All TestCase/Testrail-activity-01-01-2026.xlsx" }
      ]
    },
    {
      name: "Jira",
      type: "folder",
      desc: "Sprint backlogs, epic maps",
      children: [
        {
          name: "Bug-List-Export",
          type: "folder",
          children: [
            { name: "All Bug.csv", type: "file", ext: ".csv", path: "QA Evidence Gallery/Jira/Bug-List-Export/All Bug.csv" },
            { name: "All Bug.png", type: "file", ext: ".png", path: "QA Evidence Gallery/Jira/Bug-List-Export/All Bug.png" },
            { name: "Bug list detlais.pdf", type: "file", ext: ".pdf", path: "QA Evidence Gallery/Jira/Bug-List-Export/Bug list detlais.pdf" }
          ]
        },
        {
          name: "Reports",
          type: "folder",
          children: [
            { name: "Deployment frequency - Jira.pdf", type: "file", ext: ".pdf", path: "QA Evidence Gallery/Jira/Reports/Deployment frequency - Jira.pdf" },
            { name: "Report - Created vs Resolved Issues Report - Jira.pdf", type: "file", ext: ".pdf", path: "QA Evidence Gallery/Jira/Reports/Report - Created vs Resolved Issues Report - Jira.pdf" },
            { name: "Report - Pie Chart Assigne Report - Jira.pdf", type: "file", ext: ".pdf", path: "QA Evidence Gallery/Jira/Reports/Report - Pie Chart Assigne Report - Jira.pdf" },
            { name: "Report - Pie Chart Issue Type  Report - Jira.pdf", type: "file", ext: ".pdf", path: "QA Evidence Gallery/Jira/Reports/Report - Pie Chart Issue Type  Report - Jira.pdf" },
            { name: "Report - Pie Chart leble Report - Jira.pdf", type: "file", ext: ".pdf", path: "QA Evidence Gallery/Jira/Reports/Report - Pie Chart leble Report - Jira.pdf" },
            { name: "Report - Pie Chart Project Report - Jira.pdf", type: "file", ext: ".pdf", path: "QA Evidence Gallery/Jira/Reports/Report - Pie Chart Project Report - Jira.pdf" },
            { name: "Report - Pie Chart Report - Jira.pdf", type: "file", ext: ".pdf", path: "QA Evidence Gallery/Jira/Reports/Report - Pie Chart Report - Jira.pdf" },
            { name: "Report - Recently Created Issues Report - Jira.pdf", type: "file", ext: ".pdf", path: "QA Evidence Gallery/Jira/Reports/Report - Recently Created Issues Report - Jira.pdf" },
            { name: "Report - Resolution Time Report - Jira.pdf", type: "file", ext: ".pdf", path: "QA Evidence Gallery/Jira/Reports/Report - Resolution Time Report - Jira.pdf" },
            { name: "Summary - EverShop-Bug-Tracking - Jira.pdf", type: "file", ext: ".pdf", path: "QA Evidence Gallery/Jira/Reports/Summary - EverShop-Bug-Tracking - Jira.pdf" }
          ]
        },
        {
          name: "Sample-Bugs",
          type: "folder",
          children: [
            { name: "[#ESBUG-1] Product image not displayed on Electronics category page.pdf", type: "file", ext: ".pdf", path: "QA Evidence Gallery/Jira/Sample-Bugs/[#ESBUG-1] Product image not displayed on Electronics category page.pdf" },
            { name: "[#ESBUG-10] Cart allows negative quantity for products.pdf", type: "file", ext: ".pdf", path: "QA Evidence Gallery/Jira/Sample-Bugs/[#ESBUG-10] Cart allows negative quantity for products.pdf" },
            { name: "[#ESBUG-2] Product image not displayed on Electronics category page.pdf", type: "file", ext: ".pdf", path: "QA Evidence Gallery/Jira/Sample-Bugs/[#ESBUG-2] Product image not displayed on Electronics category page.pdf" },
            { name: "[#ESBUG-3] Add to Cart button does not respond on first click.pdf", type: "file", ext: ".pdf", path: "QA Evidence Gallery/Jira/Sample-Bugs/[#ESBUG-3] Add to Cart button does not respond on first click.pdf" },
            { name: "[#ESBUG-4] Cart item count does not update immediately after adding product.pdf", type: "file", ext: ".pdf", path: "QA Evidence Gallery/Jira/Sample-Bugs/[#ESBUG-4] Cart item count does not update immediately after adding product.pdf" },
            { name: "[#ESBUG-5] Checkout page loads indefinitely when proceeding from cart.pdf", type: "file", ext: ".pdf", path: "QA Evidence Gallery/Jira/Sample-Bugs/[#ESBUG-5] Checkout page loads indefinitely when proceeding from cart.pdf" },
            { name: "[#ESBUG-6] Product price mismatch between product page and cart.pdf", type: "file", ext: ".pdf", path: "QA Evidence Gallery/Jira/Sample-Bugs/[#ESBUG-6] Product price mismatch between product page and cart.pdf" },
            { name: "[#ESBUG-7] Search input placeholder text missing on mobile view.pdf", type: "file", ext: ".pdf", path: "QA Evidence Gallery/Jira/Sample-Bugs/[#ESBUG-7] Search input placeholder text missing on mobile view.pdf" },
            { name: "[#ESBUG-8] Product filter does not update results correctly.pdf", type: "file", ext: ".pdf", path: "QA Evidence Gallery/Jira/Sample-Bugs/[#ESBUG-8] Product filter does not update results correctly.pdf" },
            { name: "[#ESBUG-9] Broken link found in website footer section.pdf", type: "file", ext: ".pdf", path: "QA Evidence Gallery/Jira/Sample-Bugs/[#ESBUG-9] Broken link found in website footer section.pdf" }
          ]
        },
        {
          name: "Workflow-Proof",
          type: "folder",
          children: [
            { name: "01_All_Bugs_Logged_Status_TODO.png", type: "file", ext: ".png", path: "QA Evidence Gallery/Jira/Workflow-Proof/01_All_Bugs_Logged_Status_TODO.png" },
            { name: "02_High_Priority_Bugs_In_Progress.png", type: "file", ext: ".png", path: "QA Evidence Gallery/Jira/Workflow-Proof/02_High_Priority_Bugs_In_Progress.png" },
            { name: "03_Bugs_In_Review_And_Medium_In_Progress.png", type: "file", ext: ".png", path: "QA Evidence Gallery/Jira/Workflow-Proof/03_Bugs_In_Review_And_Medium_In_Progress.png" },
            { name: "04_High_Priority_Bugs_Completed_Medium_In_Review.png", type: "file", ext: ".png", path: "QA Evidence Gallery/Jira/Workflow-Proof/04_High_Priority_Bugs_Completed_Medium_In_Review.png" },
            { name: "Workflow Proof.pdf", type: "file", ext: ".pdf", path: "QA Evidence Gallery/Jira/Workflow-Proof/Workflow Proof.pdf" }
          ]
        }
      ]
    },
    {
      name: "Newman",
      type: "folder",
      desc: "CLI automated HTML Extra reports",
      children: [
        { name: "Newman Summary Report.pdf", type: "file", ext: ".pdf", path: "QA Evidence Gallery/Newman/Newman Summary Report.pdf" },
        { name: "ReqRes Automation Collection-2026-05-15-15-07-35-522-0.html", type: "file", ext: ".html", path: "QA Evidence Gallery/Newman/ReqRes Automation Collection-2026-05-15-15-07-35-522-0.html" }
      ]
    },
    {
      name: "Postman",
      type: "folder",
      desc: "API collections, environment profiles",
      children: [
        { name: "EVERSHOP.postman_test_run.json", type: "file", ext: ".json", path: "QA Evidence Gallery/Postman/EVERSHOP.postman_test_run.json" },
        { name: "EVERSHOP-performance-report-1.pdf", type: "file", ext: ".pdf", path: "QA Evidence Gallery/Postman/EVERSHOP-performance-report-1.pdf" },
        { name: "ReqRes-Automation-Collection-performance-report-1.pdf", type: "file", ext: ".pdf", path: "QA Evidence Gallery/Postman/ReqRes-Automation-Collection-performance-report-1.pdf" },
        { name: "Swagger-Petstore-Project-performance-report-2.pdf", type: "file", ext: ".pdf", path: "QA Evidence Gallery/Postman/Swagger-Petstore-Project-performance-report-2.pdf" }
      ]
    },
    {
      name: "Requirement Analysis",
      type: "folder",
      desc: "Requirement analysis artifacts",
      children: [
        { name: "Requirement Analysis.docx", type: "file", ext: ".docx", path: "QA Evidence Gallery/Requirement Analysis/Requirement Analysis.docx" }
      ]
    },
    {
      name: "selenium",
      type: "folder",
      desc: "Selenium automated test reports",
      children: [
        { name: "Mochawesome Report.pdf", type: "file", ext: ".pdf", path: "QA Evidence Gallery/selenum/Mochawesome Report.pdf" }
      ]
    },
    {
      name: "Test Plan",
      type: "folder",
      desc: "Strategic test planning documentation",
      children: [
        { name: "Test_Plan_Petstore_v1.0.pdf", type: "file", ext: ".pdf", path: "QA Evidence Gallery/Test Plan/Test_Plan_Petstore_v1.0.pdf" }
      ]
    },
    {
      name: "TestCase-saucedemo",
      type: "folder",
      desc: "E-Commerce web testing execution assets",
      children: [
        {
          name: "Bug List",
          type: "folder",
          children: [
            { name: "Bug List.xlsx", type: "file", ext: ".xlsx", path: "QA Evidence Gallery/TestCase-saucedemo/Bug List/Bug List.xlsx" }
          ]
        },
        {
          name: "Screenshot",
          type: "folder",
          children: [
            { name: "Code_Generated_Image (1).png", type: "file", ext: ".png", path: "QA Evidence Gallery/TestCase-saucedemo/Screenshot/Code_Generated_Image (1).png" },
            { name: "Code_Generated_Image (2).png", type: "file", ext: ".png", path: "QA Evidence Gallery/TestCase-saucedemo/Screenshot/Code_Generated_Image (2).png" },
            { name: "Code_Generated_Image.png", type: "file", ext: ".png", path: "QA Evidence Gallery/TestCase-saucedemo/Screenshot/Code_Generated_Image.png" },
            { name: "SauceDemo_Defect_Summary_-_Severity_and_Status_Distribution.png", type: "file", ext: ".png", path: "QA Evidence Gallery/TestCase-saucedemo/Screenshot/SauceDemo_Defect_Summary_-_Severity_and_Status_Distribution.png" },
            { name: "screencapture-saucedemo-checkout-step-one-html-2026-01-06-08_16_21.jpg", type: "file", ext: ".jpg", path: "QA Evidence Gallery/TestCase-saucedemo/Screenshot/screencapture-saucedemo-checkout-step-one-html-2026-01-06-08_16_21.jpg" },
            { name: "screencapture-saucedemo-checkout-step-one-html-2026-01-06-08_20_46.jpg", type: "file", ext: ".jpg", path: "QA Evidence Gallery/TestCase-saucedemo/Screenshot/screencapture-saucedemo-checkout-step-one-html-2026-01-06-08_20_46.jpg" },
            { name: "screencapture-saucedemo-inventory-html-2026-01-06-07_23_21.jpg", type: "file", ext: ".jpg", path: "QA Evidence Gallery/TestCase-saucedemo/Screenshot/screencapture-saucedemo-inventory-html-2026-01-06-07_23_21.jpg" },
            { name: "Screenshot 2026-01-06 030742.png", type: "file", ext: ".png", path: "QA Evidence Gallery/TestCase-saucedemo/Screenshot/Screenshot 2026-01-06 030742.png" },
            { name: "Screenshot 2026-01-06 030832.png", type: "file", ext: ".png", path: "QA Evidence Gallery/TestCase-saucedemo/Screenshot/Screenshot 2026-01-06 030832.png" },
            { name: "Screenshot 2026-01-06 030920.png", type: "file", ext: ".png", path: "QA Evidence Gallery/TestCase-saucedemo/Screenshot/Screenshot 2026-01-06 030920.png" },
            { name: "Screenshot 2026-01-06 030938.png", type: "file", ext: ".png", path: "QA Evidence Gallery/TestCase-saucedemo/Screenshot/Screenshot 2026-01-06 030938.png" },
            { name: "Screenshot 2026-01-06 030950.png", type: "file", ext: ".png", path: "QA Evidence Gallery/TestCase-saucedemo/Screenshot/Screenshot 2026-01-06 030950.png" },
            { name: "Screenshot 2026-01-06 030957.png", type: "file", ext: ".png", path: "QA Evidence Gallery/TestCase-saucedemo/Screenshot/Screenshot 2026-01-06 030957.png" },
            { name: "Screenshot 2026-01-06 065448.png", type: "file", ext: ".png", path: "QA Evidence Gallery/TestCase-saucedemo/Screenshot/Screenshot 2026-01-06 065448.png" },
            { name: "Test_Execution_Status_by_Module.png", type: "file", ext: ".png", path: "QA Evidence Gallery/TestCase-saucedemo/Screenshot/Test_Execution_Status_by_Module.png" },
            { name: "test_execution_summary.png", type: "file", ext: ".png", path: "QA Evidence Gallery/TestCase-saucedemo/Screenshot/test_execution_summary.png" }
          ]
        },
        {
          name: "Test Case",
          type: "folder",
          children: [
            { name: "Authentication & Session Management.xlsx", type: "file", ext: ".xlsx", path: "QA Evidence Gallery/TestCase-saucedemo/Test Case/Authentication & Session Management.xlsx" },
            { name: "Cart Functionality.xlsx", type: "file", ext: ".xlsx", path: "QA Evidence Gallery/TestCase-saucedemo/Test Case/Cart Functionality.xlsx" },
            { name: "Checkout.xlsx", type: "file", ext: ".xlsx", path: "QA Evidence Gallery/TestCase-saucedemo/Test Case/Checkout.xlsx" },
            { name: "End-to-End & System Edge Cases.xlsx", type: "file", ext: ".xlsx", path: "QA Evidence Gallery/TestCase-saucedemo/Test Case/End-to-End & System Edge Cases.xlsx" },
            { name: "Inventory Page (Product Listing).xlsx", type: "file", ext: ".xlsx", path: "QA Evidence Gallery/TestCase-saucedemo/Test Case/Inventory Page (Product Listing).xlsx" },
            { name: "Product Detail.xlsx", type: "file", ext: ".xlsx", path: "QA Evidence Gallery/TestCase-saucedemo/Test Case/Product Detail.xlsx" },
            { name: "TestCase_All in one.xlsx", type: "file", ext: ".xlsx", path: "QA Evidence Gallery/TestCase-saucedemo/Test Case/TestCase_All in one.xlsx" }
          ]
        },
        {
          name: "Test Execution Report",
          type: "folder",
          children: [
            { name: "Quick Reference_Test Execution Summary.pdf", type: "file", ext: ".pdf", path: "QA Evidence Gallery/TestCase-saucedemo/Test Execution Report/Quick Reference_Test Execution Summary.pdf" },
            { name: "Test Execution Report.pdf", type: "file", ext: ".pdf", path: "QA Evidence Gallery/TestCase-saucedemo/Test Execution Report/Test Execution Report.pdf" }
          ]
        },
        {
          name: "Test Plan",
          type: "folder",
          children: [
            { name: "Test Plan_SauceDemo E-Commerce Application.pdf", type: "file", ext: ".pdf", path: "QA Evidence Gallery/TestCase-saucedemo/Test Plan/Test Plan_SauceDemo E-Commerce Application.pdf" }
          ]
        },
        {
          name: "Test Scenarios",
          type: "folder",
          children: [
            { name: "Test Scenarios_SauceDemo E-Commerce Application.pdf", type: "file", ext: ".pdf", path: "QA Evidence Gallery/TestCase-saucedemo/Test Scenarios/Test Scenarios_SauceDemo E-Commerce Application.pdf" }
          ]
        }
      ]
    },
    {
      name: "TestRail",
      type: "folder",
      desc: "Enterprise test runs, execution tracking",
      children: [
        {
          name: "Project Summary",
          type: "folder",
          children: [
            { name: "Project Summary.pdf", type: "file", ext: ".pdf", path: "QA Evidence Gallery/TestRail/Project Summary/Project Summary.pdf" }
          ]
        },
        {
          name: "Test Plan",
          type: "folder",
          children: [
            { name: "Test_Plan_Petstore_v1.0.pdf", type: "file", ext: ".pdf", path: "QA Evidence Gallery/TestRail/Test Plan/Test_Plan_Petstore_v1.0.pdf" }
          ]
        },
        {
          name: "Test-Cases",
          type: "folder",
          children: [
            { name: "Test_Cases_Petstore_v1.0.pdf", type: "file", ext: ".pdf", path: "QA Evidence Gallery/TestRail/Test-Cases/Test_Cases_Petstore_v1.0.pdf" },
            { name: "Testrail-activity-01-01-2026.xlsx", type: "file", ext: ".xlsx", path: "QA Evidence Gallery/TestRail/Test-Cases/Testrail-activity-01-01-2026.xlsx" }
          ]
        },
        {
          name: "Test-Closure",
          type: "folder",
          children: [
            { name: "Test_Summary_and_Closure_Report_Petstore_v1.0.pdf", type: "file", ext: ".pdf", path: "QA Evidence Gallery/TestRail/Test-Closure/Test_Summary_and_Closure_Report_Petstore_v1.0.pdf" }
          ]
        },
        {
          name: "Test-Execution",
          type: "folder",
          children: [
            { name: "Petstore – Functional Test Run - TestRail.pdf", type: "file", ext: ".pdf", path: "QA Evidence Gallery/TestRail/Test-Execution/Petstore – Functional Test Run - TestRail.pdf" },
            { name: "QA_Metrics_Petstore.xlsx", type: "file", ext: ".xlsx", path: "QA Evidence Gallery/TestRail/Test-Execution/QA_Metrics_Petstore.xlsx" },
            { name: "TestCase_Status_Matrix_Petstore_Dashboard.xlsx", type: "file", ext: ".xlsx", path: "QA Evidence Gallery/TestRail/Test-Execution/TestCase_Status_Matrix_Petstore_Dashboard.xlsx" },
            { name: "Testrail-activity-12-27-2025-01-01-2026.png", type: "file", ext: ".png", path: "QA Evidence Gallery/TestRail/Test-Execution/Testrail-activity-12-27-2025-01-01-2026.png" },
            { name: "testrail-report-5.pdf", type: "file", ext: ".pdf", path: "QA Evidence Gallery/TestRail/Test-Execution/testrail-report-5.pdf" },
            { name: "testrail-report-6.pdf", type: "file", ext: ".pdf", path: "QA Evidence Gallery/TestRail/Test-Execution/testrail-report-6.pdf" },
            { name: "testrail-report-7.pdf", type: "file", ext: ".pdf", path: "QA Evidence Gallery/TestRail/Test-Execution/testrail-report-7.pdf" },
            { name: "TestRail-stats-2-20260101170030.csv", type: "file", ext: ".csv", path: "QA Evidence Gallery/TestRail/Test-Execution/TestRail-stats-2-20260101170030.csv" },
            { name: "TestRail-stats-2-20260101170030.png", type: "file", ext: ".png", path: "QA Evidence Gallery/TestRail/Test-Execution/TestRail-stats-2-20260101170030.png" }
          ]
        }
      ]
    }
  ];

  let currentFolder = { name: "Root", children: WORKSPACE_DATA };
  let history = [currentFolder];

  const grid = document.getElementById('explorer-grid');
  const backBtn = document.getElementById('explorer-back-btn');
  const breadcrumbs = document.getElementById('explorer-breadcrumbs');

  const modal = document.getElementById('workspace-lightbox');
  const modalBody = document.getElementById('lightbox-body-content');
  const modalTitle = document.getElementById('lightbox-filename');
  const modalClose = document.getElementById('lightbox-close-btn');
  const modalBackdrop = modal.querySelector('.lightbox-backdrop');

  // Vector SVGs (Refinement 1: Sleek vector SVGs instead of emojis)
  const folderSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" width="40" height="40">
      <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-19.5 0A2.25 2.25 0 0 0 2.25 15v4.5a2.25 2.25 0 0 0 2.25 2.25h15a2.25 2.25 0 0 0 2.25-2.25V15a2.25 2.25 0 0 0-2.25-2.25m-19.5 0h19.5M2.25 9.75V6a2.25 2.25 0 0 1 2.25-2.25h3.75A2.25 2.25 0 0 1 10 4.75l.896.897c.078.079.183.123.293.123h8.31a2.25 2.25 0 0 1 2.25 2.25V9.75" />
    </svg>`;

  const excelSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" width="40" height="40">
      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
    </svg>`;

  const pdfSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" width="40" height="40">
      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
    </svg>`;

  const imageSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" width="40" height="40">
      <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.9 2.9m-18 1.5V6a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 2.25 18v-2.25Z" />
    </svg>`;

  const codeSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" width="40" height="40">
      <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
    </svg>`;

  const docSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" width="40" height="40">
      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25M9 13.5h6m-6 3h6m-6-9h.008v.008H9V7.5Z" />
    </svg>`;

  function getFileIcon(ext) {
    switch (ext) {
      case '.xlsx':
      case '.xls':
      case '.csv':
        return excelSvg;
      case '.pdf':
        return pdfSvg;
      case '.png':
      case '.jpg':
      case '.jpeg':
      case '.gif':
      case '.webp':
        return imageSvg;
      case '.json':
      case '.html':
      case '.js':
        return codeSvg;
      case '.docx':
      case '.doc':
        return docSvg;
      default:
        return docSvg;
    }
  }

  function getFileMeta(file) {
    let size = "KB";
    if (file.ext === '.pdf') size = "1.2 MB";
    else if (file.ext === '.xlsx' || file.ext === '.csv') size = "45 KB";
    else if (file.ext === '.png' || file.ext === '.jpg') size = "320 KB";
    else if (file.ext === '.html') size = "840 KB";
    else size = "12 KB";
    return `${file.ext.toUpperCase()} • ${size}`;
  }

  function renderExplorer() {
    if (!grid) return;
    grid.innerHTML = '';

    // Handle Back Button State
    backBtn.disabled = history.length <= 1;

    // Render Breadcrumbs
    renderBreadcrumbs();

    const items = currentFolder.children || [];
    if (items.length === 0) {
      grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-secondary); padding: 40px 0;">This directory is empty.</div>`;
      return;
    }

    items.forEach((item, index) => {
      const node = document.createElement('div');
      node.classList.add('explorer-node');

      if (item.type === 'folder') {
        node.classList.add('node-folder');
        node.innerHTML = `
          <div class="node-icon-wrapper">${folderSvg}</div>
          <div class="node-title">${item.name}</div>
          <div class="node-desc">${item.desc || 'Directory folder containing QA artifacts.'}</div>
          <div class="node-meta">
            <span>Folder</span>
            <span>${item.children ? (Array.isArray(item.children) ? item.children.length : 1) : 0} items</span>
          </div>
        `;
        node.addEventListener('click', () => {
          history.push(item);
          currentFolder = item;
          renderExplorer();
        });
      } else {
        node.classList.add('node-file');
        node.innerHTML = `
          <div class="node-icon-wrapper">${getFileIcon(item.ext)}</div>
          <div class="node-title">${item.name}</div>
          <div class="node-desc">Verification report artifact.</div>
          <div class="node-meta">
            <span>File</span>
            <span>${getFileMeta(item)}</span>
          </div>
          <div class="node-actions">
            <button class="node-btn node-btn-preview" data-index="${index}">Preview</button>
            <a href="${item.path}" download class="node-btn node-btn-download">Download</a>
          </div>
        `;
        
        const previewBtn = node.querySelector('.node-btn-preview');
        previewBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          openPreview(item);
        });

        node.addEventListener('click', () => {
          openPreview(item);
        });
      }

      grid.appendChild(node);
    });
  }

  function renderBreadcrumbs() {
    if (!breadcrumbs) return;
    breadcrumbs.innerHTML = '';

    history.forEach((folder, index) => {
      if (index > 0) {
        const sep = document.createElement('span');
        sep.classList.add('address-separator');
        sep.textContent = '›';
        breadcrumbs.appendChild(sep);
      }

      const item = document.createElement('span');
      item.classList.add('breadcrumb-item');
      item.textContent = folder.name;

      if (index === history.length - 1) {
        item.classList.add('active');
      } else {
        item.addEventListener('click', () => {
          history = history.slice(0, index + 1);
          currentFolder = folder;
          renderExplorer();
        });
      }

      breadcrumbs.appendChild(item);
    });
  }

  // Go Back
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      if (history.length > 1) {
        history.pop();
        currentFolder = history[history.length - 1];
        renderExplorer();
      }
    });
  }

  // Previews
  function openPreview(file) {
    if (!modal || !modalBody || !modalTitle) return;
    modalTitle.textContent = file.name;
    modalBody.innerHTML = '';
    
    modalBody.innerHTML = `<div class="preview-loader" style="color: #a78bfa; font-family: monospace;">Loading Preview...</div>`;

    setTimeout(() => {
      modalBody.innerHTML = '';

      if (file.ext === '.pdf') {
        const iframe = document.createElement('iframe');
        iframe.src = file.path;
        iframe.className = 'lightbox-iframe';
        modalBody.appendChild(iframe);
      } else if (file.ext === '.html') {
        const iframe = document.createElement('iframe');
        iframe.src = file.path;
        iframe.className = 'lightbox-iframe';
        // Refinement 3: Using sandbox attribute to allow HTML files to run securely
        iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin');
        modalBody.appendChild(iframe);
      } else if (['.png', '.jpg', '.jpeg', '.webp'].includes(file.ext)) {
        const img = document.createElement('img');
        img.src = file.path;
        img.className = 'lightbox-img';
        img.alt = file.name;
        modalBody.appendChild(img);
      } else if (file.ext === '.xlsx' || file.ext === '.csv') {
        renderMockSpreadsheet(file);
      } else if (file.ext === '.json') {
        renderMockJson(file);
      } else if (file.ext === '.docx' || file.ext === '.doc') {
        renderMockDocx(file);
      } else {
        modalBody.innerHTML = `<div style="text-align: center; color: var(--text-secondary); padding: 40px;"><p>No dynamic preview available for this file type.</p><a href="${file.path}" download class="btn" style="margin-top: 16px; display: inline-block;">Download File</a></div>`;
      }
    }, 300);

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closePreview() {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
      if (modalBody) modalBody.innerHTML = '';
    }
  }

  if (modalClose) modalClose.addEventListener('click', closePreview);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closePreview);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closePreview();
  });

  // Mock Previews
  function renderMockSpreadsheet(file) {
    const isBugList = file.name.toLowerCase().includes('bug');
    let html = `
      <div class="lightbox-table-viewer">
        <table class="lightbox-table">
          <thead>
            <tr>
    `;

    if (isBugList) {
      html += `
              <th>Defect ID</th>
              <th>Summary</th>
              <th>Severity</th>
              <th>Status</th>
              <th>Target Release</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>#ESBUG-01</td><td>Checkout page loads indefinitely when proceeding from cart page</td><td>Critical</td><td>In Progress</td><td>v1.0-Sprint 4</td></tr>
            <tr><td>#ESBUG-02</td><td>Cart allows negative quantity of products via API manipulation</td><td>High</td><td>Resolved</td><td>v1.0-Sprint 4</td></tr>
            <tr><td>#ESBUG-03</td><td>Add to Cart button does not respond on first click mobile views</td><td>Medium</td><td>Open</td><td>v1.1-Backlog</td></tr>
            <tr><td>#ESBUG-04</td><td>Search input placeholder text missing on Safari mobile</td><td>Low</td><td>Closed</td><td>v1.0-Sprint 3</td></tr>
            <tr><td>#ESBUG-05</td><td>Product price mismatch between product page and checkout screen</td><td>High</td><td>In Review</td><td>v1.0-Sprint 4</td></tr>
      `;
    } else {
      html += `
              <th>TestCase ID</th>
              <th>Test Scenario / Title</th>
              <th>Category</th>
              <th>Priority</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>TC-AUTH-01</td><td>Verify user registration with valid parameters</td><td>Authentication</td><td>P1</td><td>Pass</td></tr>
            <tr><td>TC-AUTH-02</td><td>Verify session invalidation after browser close</td><td>Session Management</td><td>P2</td><td>Pass</td></tr>
            <tr><td>TC-CART-04</td><td>Verify decimal product pricing is correctly accumulated in cart summary</td><td>Shopping Cart</td><td>P1</td><td>Pass</td></tr>
            <tr><td>TC-CHCK-08</td><td>Verify checkout with multiple product items concurrent stock check</td><td>Checkout Flow</td><td>P1</td><td>Fail</td></tr>
            <tr><td>TC-EDGE-12</td><td>Verify payment flow timeout recovery on network loss</td><td>Integration Edge Case</td><td>P2</td><td>Blocked</td></tr>
      `;
    }

    html += `
          </tbody>
        </table>
      </div>
    `;
    modalBody.innerHTML = html;
  }

  function renderMockJson(file) {
    let mockContent = {
      "info": {
        "name": file.name,
        "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
      },
      "item": [
        {
          "name": "Verify API Endpoints Status",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/users?page=2",
              "host": ["{{baseUrl}}"],
              "path": ["api", "users"]
            }
          },
          "response": []
        },
        {
          "name": "Authenticate Client Session",
          "request": {
            "method": "POST",
            "header": [{ "key": "Content-Type", "value": "application/json" }],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"email\": \"eve.holt@reqres.in\",\n  \"password\": \"pistol\"\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/api/register",
              "host": ["{{baseUrl}}"]
            }
          }
        }
      ]
    };
    
    modalBody.innerHTML = `
      <pre class="lightbox-text-viewer">${JSON.stringify(mockContent, null, 2)}</pre>
    `;
  }

  function renderMockDocx(file) {
    modalBody.innerHTML = `
      <div class="lightbox-text-viewer" style="background: #121215; color: var(--text-primary); font-family: sans-serif; white-space: normal; padding: 30px;">
        <h2 style="color: #a78bfa; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 10px; margin-top: 0;">${file.name}</h2>
        <div style="margin-top: 20px; line-height: 1.6; font-size: 14px;">
          <p><strong>Artifact Context:</strong> Product Requirement Document &amp; Requirement Traceability Matrix</p>
          <p><strong>Owner:</strong> Quality Assurance Division</p>
          <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.05); margin: 20px 0;">
          <h4 style="color: #a78bfa; margin-bottom: 8px;">1. Scope &amp; Functional Traceability</h4>
          <p>This document details the functional specifications for the e-commerce store catalog indexing system. All functional items must map 1-to-1 to functional boundary matrices inside the test suite.</p>
          <h4 style="color: #a78bfa; margin-bottom: 8px; margin-top: 20px;">2. Boundary Defect Mapping</h4>
          <p>Each boundary condition listed (e.g. quantity input overflow, zero price entries, stock concurrency transactions) is covered by Newman automation collections and manual TestRail trackers.</p>
        </div>
      </div>
    `;
  }

  // Initial Run
  window.addEventListener('DOMContentLoaded', () => {
    renderExplorer();
  });
})();

/* ── Theme Switcher Module (Dark / Light Modes) ── */
(function () {
  const themeToggle = document.getElementById('themeToggle');
  const heroPhoto = document.getElementById('heroPhoto');

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Swap hero image based on theme
    if (heroPhoto) {
      if (theme === 'light') {
        heroPhoto.src = 'myphoto/lightmoodmyphoto.jpeg';
      } else {
        heroPhoto.src = 'myphoto/SOURAV.webp';
      }
    }

    // Dynamic GitHub widgets theme adjustment
    const githubImages = document.querySelectorAll('.github-dashboard img');
    githubImages.forEach(img => {
      let src = img.src;
      if (theme === 'light') {
        src = src.replace(/theme=tokyonight/g, 'theme=default');
        src = src.replace(/bg_color=121215/g, 'bg_color=ffffff');
        src = src.replace(/background=121215/g, 'background=ffffff');
      } else {
        src = src.replace(/theme=default/g, 'theme=tokyonight');
        src = src.replace(/bg_color=ffffff/g, 'bg_color=121215');
        src = src.replace(/background=ffffff/g, 'background=121215');
      }
      img.src = src;
    });
  }

  // Initial load sync
  const currentTheme = localStorage.getItem('theme') || 'dark';
  applyTheme(currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'light' ? 'dark' : 'light';
      applyTheme(newTheme);
    });
  }
})();

