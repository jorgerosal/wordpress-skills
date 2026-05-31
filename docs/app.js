const installs = {
  "claude-project": {
    title: "Claude project install",
    meta:
      "Best for shared repos, client work, and teams. This keeps the skill pack versioned with the project and gives everyone the same install path.",
    code: `# In your project root
git submodule add https://github.com/jorgerosal/wordpress-skills.git .claude/plugins/wordpress-skills
git commit -m "Add WordPress Claude skills"

# Later updates
git submodule update --remote .claude/plugins/wordpress-skills
git add .claude/plugins/wordpress-skills
git commit -m "Update WordPress Claude skills"`,
    demo: (demo) => {
      demo
        .openApp("editor", {
          minHeight: "240px",
          windowTitle: "project-install.md",
          initialContent: ""
        })
        .write(
          `# Claude project install

- Recommended for teams
- Versioned with the repo
- Easiest install path to support`,
          { onCompleteDelay: 1000 }
        )
        .openApp("terminal", {
          minHeight: "220px",
          windowTitle: "project-install",
          promptString: "~/my-project $",
          id: "project"
        })
        .command(
          "git submodule add https://github.com/jorgerosal/wordpress-skills.git .claude/plugins/wordpress-skills",
          { id: "project", onCompleteDelay: 400 }
        )
        .respond("Adding the skill pack to this repository...", {
          id: "project",
          onCompleteDelay: 800
        })
        .command('git commit -m "Add WordPress Claude skills"', {
          id: "project",
          onCompleteDelay: 400
        })
        .respond("[recommended] best for teams and client work", {
          id: "project",
          onCompleteDelay: 900
        })
        .end();
    }
  },
  "claude-user": {
    title: "Claude user install",
    meta:
      "Best when you want the pack available across multiple projects on one machine without touching each repo separately.",
    code: `git clone https://github.com/jorgerosal/wordpress-skills.git ~/.claude/plugins/wordpress-skills

# Later updates
cd ~/.claude/plugins/wordpress-skills
git pull`,
    demo: (demo) => {
      demo
        .openApp("terminal", {
          minHeight: "300px",
          windowTitle: "user-install",
          promptString: "~ $",
          id: "user"
        })
        .command(
          "git clone https://github.com/jorgerosal/wordpress-skills.git ~/.claude/plugins/wordpress-skills",
          { id: "user", onCompleteDelay: 400 }
        )
        .respond("Cloning the pack for machine-wide usage...", {
          id: "user",
          onCompleteDelay: 900
        })
        .command("cd ~/.claude/plugins/wordpress-skills && git pull", {
          id: "user",
          onCompleteDelay: 400
        })
        .respond("[solo] easiest across multiple local projects", {
          id: "user",
          onCompleteDelay: 800
        })
        .end();
    }
  },
  "claude-single": {
    title: "Claude one-skill install",
    meta:
      "Use this when you only want a specific skill. It stays simple, but updates remain manual because you copy the folder directly.",
    code: `# Copy just one Claude skill
cp -r claude-skills/wp-performance-review ~/.claude/skills/

# Verify
/wp-perf-review`,
    demo: (demo) => {
      demo
        .openApp("terminal", {
          minHeight: "320px",
          windowTitle: "single-skill-install",
          promptString: "~/wordpress-skills $",
          id: "single"
        })
        .command("cp -r claude-skills/wp-performance-review ~/.claude/skills/", {
          id: "single",
          onCompleteDelay: 400
        })
        .respond("Copied one skill only. Updates are manual.", {
          id: "single",
          onCompleteDelay: 800
        })
        .command("/wp-perf-review", {
          id: "single",
          promptString: "claude> ",
          onCompleteDelay: 400
        })
        .respond("Ready to review a WordPress project.", {
          id: "single",
          onCompleteDelay: 800
        })
        .end();
    }
  },
  "codex-all": {
    title: "Codex all-skills install",
    meta:
      "Install every Codex wrapper plus the shared Claude reference tree the wrappers depend on. This is the cleanest full-pack Codex setup.",
    code: `mkdir -p ~/.codex/skills
cp -r codex-skills/* ~/.codex/skills/
cp -r claude-skills ~/.codex/claude-skills

# If using a custom CODEX_HOME
# copy wrappers into $CODEX_HOME/skills/
# copy shared references into $CODEX_HOME/claude-skills/`,
    demo: (demo) => {
      demo
        .openApp("editor", {
          minHeight: "220px",
          windowTitle: "codex-install.md",
          initialContent: ""
        })
        .write(
          `# Codex all-skills install

- Install wrappers into ~/.codex/skills
- Install shared references into ~/.codex/claude-skills`,
          { onCompleteDelay: 900 }
        )
        .openApp("terminal", {
          minHeight: "260px",
          windowTitle: "codex-all",
          promptString: "~ $",
          id: "codex-all"
        })
        .command("mkdir -p ~/.codex/skills", {
          id: "codex-all",
          onCompleteDelay: 250
        })
        .command("cp -r codex-skills/* ~/.codex/skills/", {
          id: "codex-all",
          onCompleteDelay: 300
        })
        .command("cp -r claude-skills ~/.codex/claude-skills", {
          id: "codex-all",
          onCompleteDelay: 350
        })
        .respond("Codex wrappers and shared references are in place.", {
          id: "codex-all",
          onCompleteDelay: 900
        })
        .end();
    }
  },
  "codex-single": {
    title: "Codex one-skill install",
    meta:
      "Useful when you only want one Codex wrapper. Copy the wrapper and the matching shared references so the relative reference path stays valid.",
    code: `mkdir -p ~/.codex/skills
cp -r codex-skills/wp-performance-review ~/.codex/skills/

mkdir -p ~/.codex/claude-skills/wp-performance-review
cp -r claude-skills/wp-performance-review/references ~/.codex/claude-skills/wp-performance-review/`,
    demo: (demo) => {
      demo
        .openApp("terminal", {
          minHeight: "330px",
          windowTitle: "codex-one-skill",
          promptString: "~/wordpress-skills $",
          id: "codex-single"
        })
        .command("mkdir -p ~/.codex/skills", {
          id: "codex-single",
          onCompleteDelay: 250
        })
        .command("cp -r codex-skills/wp-performance-review ~/.codex/skills/", {
          id: "codex-single",
          onCompleteDelay: 300
        })
        .command("mkdir -p ~/.codex/claude-skills/wp-performance-review", {
          id: "codex-single",
          onCompleteDelay: 250
        })
        .command(
          "cp -r claude-skills/wp-performance-review/references ~/.codex/claude-skills/wp-performance-review/",
          { id: "codex-single", onCompleteDelay: 350 }
        )
        .respond("Single Codex skill installed with its shared references.", {
          id: "codex-single",
          onCompleteDelay: 900
        })
        .end();
    }
  }
};

const tabs = [...document.querySelectorAll(".install-tab")];
const installTitle = document.getElementById("install-title");
const installMeta = document.getElementById("install-meta");
const installCode = document.getElementById("install-code");
const copyInstall = document.getElementById("copy-install");
const demoStage = document.getElementById("demo-stage");
const playDemo = document.getElementById("play-demo");

let currentInstall = "claude-project";
let demoHasPlayed = false;

function renderInstall(key) {
  currentInstall = key;
  demoHasPlayed = false;
  const item = installs[key];
  installTitle.textContent = item.title;
  installMeta.textContent = item.meta;
  installCode.textContent = item.code;
  demoStage.innerHTML = "";
  tabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.install === key);
  });
}

function runDemo() {
  demoStage.innerHTML = "";
  const demo = new GDemo("#demo-stage");
  installs[currentInstall].demo(demo);
  demoHasPlayed = true;
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    renderInstall(tab.dataset.install);
  });
});

copyInstall.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(installs[currentInstall].code);
    copyInstall.textContent = "Copied";
    window.setTimeout(() => {
      copyInstall.textContent = "Copy commands";
    }, 1400);
  } catch (error) {
    copyInstall.textContent = "Copy failed";
    window.setTimeout(() => {
      copyInstall.textContent = "Copy commands";
    }, 1400);
  }
});

playDemo.addEventListener("click", runDemo);

const stageObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !demoHasPlayed) {
        runDemo();
      }
    });
  },
  { threshold: 0.35 }
);

stageObserver.observe(demoStage);

renderInstall(currentInstall);
