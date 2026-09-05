/**
* Template Name: iPortfolio
* Updated: Mar 10 2023 with Bootstrap v5.2.3
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  // %%%%26.04.2026%%%%%%% unified academic sidebar navigation
  const sidebarHeader = select('#header')
  const sidebarNav = select('#navbar')

  if (sidebarHeader && sidebarNav) {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html'
    const isHomePage = currentPage === 'index.html'
    const experiencePages = ['portfolio-employment.html', 'portfolio-education.html']
    const isExperiencePage = experiencePages.includes(currentPage)
    const activeClass = (page) => currentPage === page ? ' active' : ''
    const currentPageAttribute = (page) => currentPage === page ? ' aria-current="page"' : ''
    const homeHref = isHomePage ? '#hero' : 'index.html#hero'

    sidebarNav.className = 'nav-menu navbar sidebar-navigation'
    sidebarNav.setAttribute('aria-label', 'Primary navigation')
    sidebarNav.innerHTML = `
      <span class="sidebar-nav-label">Explore</span>
      <ul class="sidebar-nav-list">
        <li>
          <a href="${homeHref}" class="nav-link${isHomePage ? ' active' : ''}"${isHomePage ? ' aria-current="page"' : ''}>
            <i class="bx bx-home-alt" aria-hidden="true"></i><span>Home</span>
          </a>
        </li>
        <li>
          <a href="portfolio-publication.html" class="nav-link${activeClass('portfolio-publication.html')}"${currentPageAttribute('portfolio-publication.html')}>
            <i class="bx bx-book-open" aria-hidden="true"></i><span>Publications</span>
          </a>
        </li>
        <li>
          <a href="portfolio-talks.html" class="nav-link${activeClass('portfolio-talks.html')}"${currentPageAttribute('portfolio-talks.html')}>
            <i class="bx bx-microphone" aria-hidden="true"></i><span>Talks</span>
          </a>
        </li>
        <li class="nav-menu-group">
          <button type="button" class="nav-submenu-toggle${isExperiencePage ? ' active' : ''}" data-nav-submenu-toggle aria-expanded="${String(isExperiencePage)}" aria-controls="experience-submenu">
            <i class="bx bx-briefcase-alt-2" aria-hidden="true"></i>
            <span>Experience</span>
            <i class="bx bx-chevron-down nav-submenu-chevron" aria-hidden="true"></i>
          </button>
          <ul id="experience-submenu" class="nav-submenu" data-nav-submenu${isExperiencePage ? '' : ' hidden'}>
            <li>
              <a href="portfolio-employment.html" class="${activeClass('portfolio-employment.html').trim()}"${currentPageAttribute('portfolio-employment.html')}>
                <i class="bx bx-buildings" aria-hidden="true"></i><span>Employment</span>
              </a>
            </li>
            <li>
              <a href="portfolio-education.html" class="${activeClass('portfolio-education.html').trim()}"${currentPageAttribute('portfolio-education.html')}>
                <i class="bx bx-book-reader" aria-hidden="true"></i><span>Education</span>
              </a>
            </li>
          </ul>
        </li>
        <li>
          <a href="portfolio-teaching.html" class="nav-link${activeClass('portfolio-teaching.html')}"${currentPageAttribute('portfolio-teaching.html')}>
            <i class="bx bx-chalkboard" aria-hidden="true"></i><span>Teaching</span>
          </a>
        </li>
        <li>
          <a href="portfolio-awards.html" class="nav-link${activeClass('portfolio-awards.html')}"${currentPageAttribute('portfolio-awards.html')}>
            <i class="bx bx-medal" aria-hidden="true"></i><span>Awards</span>
          </a>
        </li>
      </ul>
    `

    const profile = sidebarHeader.querySelector('.profile')
    const profileImage = profile ? profile.querySelector('img') : null
    const profileHeading = profile ? profile.querySelector('h1') : null
    const socialContainer = profile ? profile.querySelector('.social-links') : null
    const socialLabels = {
      github: 'GitHub',
      linkedin: 'LinkedIn',
      twitter: 'X / Twitter',
      telegram: 'Telegram',
      email: 'Email'
    }

    if (profileImage) {
      profileImage.alt = 'Aleksandr Lobanov'
    }

    if (profileHeading && !profile.querySelector('.sidebar-role')) {
      profileHeading.insertAdjacentHTML(
        'afterend',
        '<p class="sidebar-role">Optimization &amp; Machine Learning</p>'
      )
    }

    if (socialContainer) {
      socialContainer.innerHTML = `
        <a href="#" class="telegram"><i class="bx bxl-telegram"></i></a>
        <a href="https://github.com/Opt-AVLobanov" class="github"><i class="bx bxl-github"></i></a>
        <a href="mailto:lobbsasha98@gmail.com" class="email"><i class="bx bx-envelope"></i></a>
        <a href="https://twitter.com/AV_Lobanov?t=UyYmyMoPierA1Mg3c6Cy8g&amp;s=35" class="twitter"><i class="bx bxl-twitter"></i></a>
        <a href="https://www.linkedin.com/in/aleksandr-lobanov-10b626325/" class="linkedin"><i class="bx bxl-linkedin"></i></a>
      `
      socialContainer.classList.add('sidebar-social-ready')
    }

    const socialLinks = socialContainer ? [...socialContainer.querySelectorAll('a')] : []

    socialLinks.forEach((socialLink) => {
      const labelEntry = Object.entries(socialLabels).find(([className]) => (
        socialLink.classList.contains(className)
      ))
      const isEmailLink = Boolean(socialLink.querySelector('.bx-envelope'))
      const label = isEmailLink ? 'Email' : labelEntry?.[1]

      if (isEmailLink) {
        socialLink.href = 'mailto:lobbsasha98@gmail.com'
      }

      if (label) {
        socialLink.setAttribute('aria-label', label)
        socialLink.title = label
      }

      if (socialLink.href.startsWith('http')) {
        socialLink.target = '_blank'
        socialLink.rel = 'noopener noreferrer'
      }
    })

    if (!sidebarHeader.querySelector('.sidebar-extras')) {
      sidebarNav.insertAdjacentHTML('afterend', `
        <div class="sidebar-extras">
          <div class="sidebar-quick-links" aria-label="Academic profile links">
            <a href="https://scholar.google.com/citations?user=D1ji84AAAAAJ&amp;hl=en" target="_blank" rel="noopener noreferrer">
              <i class="bx bx-bar-chart-alt-2" aria-hidden="true"></i>
              <span>Scholar</span>
            </a>
            <!-- %%%%26.04.2026%%%%%%% public CV file updated to the current version -->
            <a href="assets/files/Aleksandr_Lobanov_CV.pdf" download>
              <i class="bx bx-download" aria-hidden="true"></i>
              <span>CV</span>
            </a>
            <!-- %%%%26.04.2026%%%%%%% public CV file updated to the current version -->
          </div>
          <a href="portfolio-map.html" class="sidebar-map-card${activeClass('portfolio-map.html')}"${currentPageAttribute('portfolio-map.html')}>
            <span class="sidebar-map-icon" aria-hidden="true">
              <i class="bx bx-world"></i>
              <span></span><span></span><span></span>
            </span>
            <span class="sidebar-map-copy">
              <strong>Academic map</strong>
              <small>Talks around the world</small>
            </span>
            <i class="bx bx-right-arrow-alt sidebar-map-arrow" aria-hidden="true"></i>
          </a>
        </div>
      `)
    }

    const submenuToggle = sidebarNav.querySelector('[data-nav-submenu-toggle]')
    const submenu = sidebarNav.querySelector('[data-nav-submenu]')

    if (submenuToggle && submenu) {
      submenuToggle.addEventListener('click', () => {
        const isOpen = submenuToggle.getAttribute('aria-expanded') === 'true'
        submenuToggle.setAttribute('aria-expanded', String(!isOpen))
        submenu.hidden = isOpen
      })
    }
  }
  // %%%%26.04.2026%%%%%%% unified academic sidebar navigation

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  // %%%%26.04.2026%%%%%%% accessible mobile navigation toggle
  const mobileNavToggle = select('.mobile-nav-toggle')
  if (mobileNavToggle) {
    mobileNavToggle.setAttribute('role', 'button')
    mobileNavToggle.setAttribute('tabindex', '0')
    mobileNavToggle.setAttribute('aria-label', 'Open navigation')
    mobileNavToggle.setAttribute('aria-expanded', 'false')
  }

  on('click', '.mobile-nav-toggle', function(e) {
    const body = select('body')
    const isOpen = body.classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
    this.setAttribute('aria-expanded', String(isOpen))
    this.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation')
  })

  on('keydown', '.mobile-nav-toggle', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      this.click()
    }
  })
  // %%%%26.04.2026%%%%%%% accessible mobile navigation toggle

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
        navbarToggle.setAttribute('aria-expanded', 'false')
        navbarToggle.setAttribute('aria-label', 'Open navigation')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  // %%%%26.04.2026%%%%%%% load optional page modules only where they are available
  if (typed && typeof Typed === 'function') {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent && typeof Waypoint === 'function') {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer && typeof Isotope === 'function') {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox
   */
  if (select('.portfolio-lightbox') && typeof GLightbox === 'function') {
    GLightbox({
      selector: '.portfolio-lightbox'
    });
  }

  /**
   * Portfolio details slider
   */
  if (select('.portfolio-details-slider') && typeof Swiper === 'function') {
    new Swiper('.portfolio-details-slider', {
      speed: 400,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      }
    });
  }

  /**
   * Testimonials slider
   */
  if (select('.testimonials-slider') && typeof Swiper === 'function') {
    new Swiper('.testimonials-slider', {
      speed: 600,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      slidesPerView: 'auto',
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 20
        },

        1200: {
          slidesPerView: 3,
          spaceBetween: 20
        }
      }
    });
  }
  // %%%%26.04.2026%%%%%%% load optional page modules only where they are available


  /**
   * Подсчет моего возраста
   */
  var now = new Date(); //Текущя дата
  var today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); //Текущя дата без времени
  const year = now.getFullYear();
  var dob = new Date(1998, 4, 29); //Дата рождения
  var dobnow = new Date(today.getFullYear(), dob.getMonth()-1, dob.getDate()); //ДР в текущем году
  var age; //Возраст

  //Возраст = текущий год - год рождения
  age = today.getFullYear() - dob.getFullYear();
  //Если ДР в этом году ещё предстоит, то вычитаем из age один год
  if (today < dobnow) {
    age = age-1;
  }
  // %%%%26.04.2026%%%%%%% safer text updates
  const ageElement = document.getElementById("age");
  if (ageElement) {
    ageElement.textContent = age;
  }

  const yearElements = document.querySelectorAll("[data-current-year], #year");
  yearElements.forEach((yearElement) => {
    yearElement.textContent = year;
    if (yearElement.tagName === "TIME") {
      yearElement.setAttribute("datetime", String(year));
    }
  });
  // %%%%26.04.2026%%%%%%% safer text updates
  // document.getElementById("year_now").innerHTML = now.getFullYear();

  // const divsWithClass = document.querySelectorAll('div.portfolio-publication');
  // const divcount = divsWithClass.length;
  // document.getElementById("divcount").innerHTML = divcount;


    /**
   * Подсчет моего возраста
   */

   // var count_div = document.querySelectorAll('div.portfolio-publication').length;
   // document.getElementById("count_div").innerHTML = count_div;


  // const scholarly = require('scholarly');
  //
  // app.get('/citations', async (req, res) => {
  //     try {
  //         const authorName = Aleksandr Lobanov;
  //         const searchQuery = scholarly.searchAuthor(authorName);
  //         const author = await searchQuery.next();
  //         await scholarly.fill(author);
  //
  //         const numCitations = author.citedby || 'N/A';
  //         res.json({ author: authorName, citations: numCitations });
  //     } catch (error) {
  //         res.status(500).json({ error: 'Error fetching data' });
  //     }
  // });
  //
  // app.listen(PORT, () => {
  //     console.log(`Server is running on http://localhost:${PORT}`);
  // });


  // // Fetch citation data from server
  // fetch('/citation_data')
  //   .then(response => response.json())
  //   .then(data => {
  //     // Update webpage content with citation data
  //     // document.getElementById('article_title').innerText = data.article_title;
  //     document.getElementById('citation_count').innerText = data.citation_count;
  //   })
  //   .catch(error => console.error('Error:', error));

  /**
   * Sync homepage counters with the generated Scholar snapshot
   */
  // %%%%26.04.2026%%%%%%% Google Scholar stats sync
  const scholarStats = window.SCHOLAR_STATS && window.SCHOLAR_STATS.metrics
  if (scholarStats) {
    select('[data-scholar-stat]', true).forEach((counter) => {
      const statKey = counter.getAttribute('data-scholar-stat')
      const statValue = scholarStats[statKey]

      if (typeof statValue === 'number' && Number.isFinite(statValue)) {
        counter.setAttribute('data-purecounter-end', String(statValue))
        counter.textContent = String(statValue)
      }
    })

    const scholarUpdatedAt = new Date(window.SCHOLAR_STATS.updatedAt)
    if (!Number.isNaN(scholarUpdatedAt.getTime())) {
      select('[data-scholar-updated]', true).forEach((updatedTime) => {
        updatedTime.dateTime = scholarUpdatedAt.toISOString()
        updatedTime.textContent = new Intl.DateTimeFormat('en', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          timeZone: 'UTC'
        }).format(scholarUpdatedAt)
      })
    }
  }
  // %%%%26.04.2026%%%%%%% Google Scholar stats sync

  // %%%%26.04.2026%%%%%%% publication filters, search and primary title links
  const publicationExplorer = select('[data-publication-explorer]')
  if (publicationExplorer) {
    const publicationCards = select('.publications-stack .portfolio-publication', true)
    const publicationSearch = select('[data-publication-search]')
    const publicationClear = select('[data-publication-clear]')
    const publicationReset = select('[data-publication-reset]')
    const publicationEmpty = select('[data-publication-empty]')
    const publicationVisibleCount = select('[data-publication-visible-count]')
    const publicationTotalCount = select('[data-publication-total-count]')
    const publicationFilters = select('[data-publication-filter]', true)
    const typeClasses = {
      journal: 'label-journal',
      conference: 'label-conference',
      arxiv: 'label-arxiv',
      chapter: 'label-chapter',
      thesis: 'label-thesis'
    }
    let activePublicationFilter = 'all'

    const normalizePublicationText = (value) => value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLocaleLowerCase('en')
      .replace(/\s+/g, ' ')
      .trim()

    const publicationCounts = Object.keys(typeClasses).reduce((counts, type) => {
      counts[type] = 0
      return counts
    }, { all: publicationCards.length })

    publicationCards.forEach((card) => {
      const heading = card.querySelector('h3')
      const authors = card.querySelector('ul li:first-child')
      const titleNode = heading
        ? [...heading.childNodes].find((node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim())
        : null
      const title = titleNode ? titleNode.textContent.replace(/\s+/g, ' ').trim() : ''
      const primarySource = card.querySelector('.btn-publisher, .btn-arxive, .btn-donwnload')
      const type = Object.entries(typeClasses).find(([, className]) => card.querySelector(`.${className}`))?.[0] || 'other'

      card.dataset.publicationType = type
      card.dataset.publicationSearchText = normalizePublicationText(
        `${title} ${authors ? authors.textContent : ''}`
      )

      if (publicationCounts[type] !== undefined) {
        publicationCounts[type] += 1
      }

      card.querySelectorAll('.btn-publisher, .btn-arxive, .btn-donwnload').forEach((actionLink) => {
        actionLink.target = '_blank'
        actionLink.rel = 'noopener noreferrer'
      })

      if (heading && titleNode && primarySource && !heading.querySelector('.publication-title-link')) {
        const titleLink = document.createElement('a')
        titleLink.className = 'publication-title-link'
        titleLink.href = primarySource.href
        titleLink.target = '_blank'
        titleLink.rel = 'noopener noreferrer'
        titleLink.textContent = title
        heading.insertBefore(titleLink, titleNode)
        titleNode.remove()
      }

      // %%%%26.04.2026%%%%%%% keep publication actions separate from long titles
      const publicationActions = heading
        ? [...heading.querySelectorAll('.btn-publisher, .btn-arxive, .btn-donwnload')]
        : []

      if (heading && publicationActions.length && !card.querySelector('.publication-actions')) {
        const actionsRow = document.createElement('div')
        actionsRow.className = 'publication-actions'
        publicationActions.forEach((actionLink) => actionsRow.append(actionLink))
        heading.insertAdjacentElement('afterend', actionsRow)

        ;[...heading.childNodes].forEach((node) => {
          if (node.nodeType === Node.TEXT_NODE && !node.textContent.trim()) {
            node.remove()
          }
        })
      }
      // %%%%26.04.2026%%%%%%% keep publication actions separate from long titles
    })

    select('[data-publication-filter-count]', true).forEach((counter) => {
      const type = counter.getAttribute('data-publication-filter-count')
      counter.textContent = String(publicationCounts[type] || 0)
    })
    publicationTotalCount.textContent = String(publicationCards.length)

    const updatePublicationResults = () => {
      const query = normalizePublicationText(publicationSearch.value)
      let visibleCount = 0

      publicationCards.forEach((card) => {
        const matchesType = activePublicationFilter === 'all'
          || card.dataset.publicationType === activePublicationFilter
        const matchesSearch = !query || card.dataset.publicationSearchText.includes(query)
        const isVisible = matchesType && matchesSearch

        card.hidden = !isVisible
        if (isVisible) {
          visibleCount += 1
        }
      })

      publicationVisibleCount.textContent = String(visibleCount)
      publicationEmpty.hidden = visibleCount !== 0
      publicationClear.hidden = publicationSearch.value.length === 0
    }

    publicationFilters.forEach((filterButton) => {
      filterButton.addEventListener('click', () => {
        activePublicationFilter = filterButton.getAttribute('data-publication-filter')
        publicationFilters.forEach((button) => {
          const isActive = button === filterButton
          button.classList.toggle('is-active', isActive)
          button.setAttribute('aria-pressed', String(isActive))
        })
        updatePublicationResults()
      })
    })

    publicationSearch.addEventListener('input', updatePublicationResults)
    publicationSearch.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && publicationSearch.value) {
        publicationSearch.value = ''
        updatePublicationResults()
      }
    })

    publicationClear.addEventListener('click', () => {
      publicationSearch.value = ''
      updatePublicationResults()
      publicationSearch.focus()
    })

    publicationReset.addEventListener('click', () => {
      activePublicationFilter = 'all'
      publicationSearch.value = ''
      publicationFilters.forEach((button) => {
        const isActive = button.getAttribute('data-publication-filter') === 'all'
        button.classList.toggle('is-active', isActive)
        button.setAttribute('aria-pressed', String(isActive))
      })
      updatePublicationResults()
      publicationSearch.focus()
    })

    updatePublicationResults()
  }
  // %%%%26.04.2026%%%%%%% publication filters, search and primary title links

  // %%%%26.04.2026%%%%%%% talks timeline grouping, statistics and filters
  const talksExplorer = select('[data-talks-explorer]')
  const talksTimeline = select('.talks-timeline')
  if (talksExplorer && talksTimeline) {
    const talksRows = [...talksTimeline.querySelectorAll('tr.conference, tr.summer_school')]
    const talksFilters = select('[data-talks-filter]', true)
    const talksYearToggle = select('[data-talks-year-toggle]')
    const talksYearOptions = select('[data-talks-year-options]')
    const talksYearGroups = new Map()
    let activeTalksType = 'all'
    let activeTalksYear = 'all'

    talksRows.forEach((row) => {
      const dateText = row.cells[0] ? row.cells[0].textContent : ''
      const year = dateText.match(/\b20\d{2}\b/)?.[0] || 'Other'
      const type = row.classList.contains('summer_school') ? 'summer_school' : 'conference'

      row.dataset.talksYear = year
      row.dataset.talksType = type

      if (!talksYearGroups.has(year)) {
        const yearRow = document.createElement('tr')
        const yearHeading = document.createElement('th')

        yearRow.className = 'talks-year-row'
        yearRow.dataset.talksYearHeading = year
        yearHeading.colSpan = 4
        yearHeading.scope = 'rowgroup'
        yearHeading.textContent = year
        yearRow.appendChild(yearHeading)
        row.parentNode.insertBefore(yearRow, row)
        talksYearGroups.set(year, yearRow)
      }
    })

    const talksCounts = {
      all: talksRows.length,
      conference: talksRows.filter((row) => row.dataset.talksType === 'conference').length,
      summer_school: talksRows.filter((row) => row.dataset.talksType === 'summer_school').length,
      years: talksYearGroups.size
    }

    select('[data-talks-stat]', true).forEach((counter) => {
      const countType = counter.getAttribute('data-talks-stat')
      counter.textContent = String(talksCounts[countType] || 0)
    })

    const updateTalksTimeline = () => {
      talksRows.forEach((row) => {
        const typeMismatch = activeTalksType !== 'all' && row.dataset.talksType !== activeTalksType
        const yearMismatch = activeTalksYear !== 'all' && row.dataset.talksYear !== activeTalksYear
        row.hidden = typeMismatch || yearMismatch
      })

      talksYearGroups.forEach((yearHeading, year) => {
        yearHeading.hidden = !talksRows.some((row) => (
          row.dataset.talksYear === year && !row.hidden
        ))
      })

      if (talksYearToggle) {
        const yearCounter = talksYearToggle.querySelector('[data-talks-stat="years"]')
        const yearLabel = talksYearToggle.querySelector('[data-talks-year-label]')
        const hasYearFilter = activeTalksYear !== 'all'

        if (yearCounter) yearCounter.textContent = hasYearFilter ? activeTalksYear : String(talksCounts.years)
        if (yearLabel) yearLabel.textContent = hasYearFilter ? 'Selected year' : 'Years'
        talksYearToggle.classList.toggle('is-active', hasYearFilter)
      }
    }

    talksFilters.forEach((filterButton) => {
      filterButton.addEventListener('click', () => {
        activeTalksType = filterButton.getAttribute('data-talks-filter')

        talksFilters.forEach((button) => {
          const isActive = button === filterButton
          button.classList.toggle('is-active', isActive)
          button.setAttribute('aria-pressed', String(isActive))
        })
        updateTalksTimeline()
      })
    })

    if (talksYearToggle && talksYearOptions) {
      const setYearOptionsOpen = (isOpen) => {
        talksYearOptions.hidden = !isOpen
        talksYearToggle.setAttribute('aria-expanded', String(isOpen))
        talksYearToggle.classList.toggle('is-open', isOpen)
      }

      const availableYears = [...talksYearGroups.keys()].sort((yearA, yearB) => (
        Number(yearB) - Number(yearA)
      ))

      ;[
        ['all', 'All years'],
        ...availableYears.map((year) => [
          year,
          `${year} (${talksRows.filter((row) => row.dataset.talksYear === year).length})`
        ])
      ].forEach(([year, label]) => {
        const yearButton = document.createElement('button')
        yearButton.type = 'button'
        yearButton.className = year === 'all' ? 'talks-year-option is-active' : 'talks-year-option'
        yearButton.dataset.talksYearFilter = year
        yearButton.textContent = label
        yearButton.setAttribute('aria-pressed', String(year === 'all'))
        talksYearOptions.appendChild(yearButton)

        yearButton.addEventListener('click', () => {
          activeTalksYear = year

          const selectedYearHasActiveType = year === 'all'
            || activeTalksType === 'all'
            || talksRows.some((row) => (
              row.dataset.talksYear === year && row.dataset.talksType === activeTalksType
            ))

          if (!selectedYearHasActiveType) {
            activeTalksType = 'all'
            talksFilters.forEach((button) => {
              const isActive = button.getAttribute('data-talks-filter') === 'all'
              button.classList.toggle('is-active', isActive)
              button.setAttribute('aria-pressed', String(isActive))
            })
          }

          select('[data-talks-year-filter]', true).forEach((button) => {
            const isActive = button === yearButton
            button.classList.toggle('is-active', isActive)
            button.setAttribute('aria-pressed', String(isActive))
          })
          updateTalksTimeline()
          setYearOptionsOpen(false)
        })
      })

      talksYearToggle.addEventListener('click', () => {
        setYearOptionsOpen(talksYearOptions.hidden)
      })

      talksExplorer.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') setYearOptionsOpen(false)
      })

      document.addEventListener('click', (event) => {
        if (!talksExplorer.contains(event.target)) setYearOptionsOpen(false)
      })
    }

    updateTalksTimeline()
  }
  // %%%%26.04.2026%%%%%%% talks timeline grouping, statistics and filters

  // %%%%26.04.2026%%%%%%% academic map generated from the Talks page
  const academicMapRoot = select('[data-academic-map]')
  if (academicMapRoot) {
    const mapCanvas = select('[data-academic-map-canvas]')
    const mapStatus = select('[data-academic-map-status]')
    const mapLocations = select('[data-academic-map-locations]')
    const mapLocationCount = select('[data-academic-map-location-count]')
    const mapYearFilter = select('[data-academic-map-year]')
    const mapTypeFilter = select('[data-academic-map-type]')
    const mapModeFilter = select('[data-academic-map-mode]')
    const mapMarkerLayer = select('[data-academic-map-marker-layer]')
    const mapPopup = select('[data-academic-map-popup]')
    const mapPopupContent = select('[data-academic-map-popup-content]')
    const mapPopupClose = select('[data-academic-map-popup-close]')
    // %%%%26.04.2026%%%%%%% extend the academic map to new 2026 locations in East Asia
    const mapBounds = {
      minLongitude: -15,
      maxLongitude: 120,
      minLatitude: 15,
      maxLatitude: 65
    }
    const cityCoordinates = {
      'Abu Dhabi': [24.4539, 54.3773],
      'Almaty': [43.2389, 76.8897],
      'Champs-sur-Marne': [48.8527, 2.6027],
      'Dolgoprudny': [55.9471, 37.4993],
      'Ekaterinburg': [56.8389, 60.6057],
      'Innopolis': [55.7522, 48.7446],
      'Irkutsk': [52.2869, 104.3050],
      'Lisbon': [38.7223, -9.1393],
      'Louvain-la-Neuve': [50.6681, 4.6118],
      'Moscow': [55.7558, 37.6173],
      'Nizhny Novgorod': [56.2965, 43.9361],
      'Novosibirsk': [55.0084, 82.9357],
      'Petrovac': [42.2056, 18.9425],
      'Pushkin': [59.7222, 30.4166],
      'Saint Petersburg': [59.9311, 30.3609],
      'Sirius': [43.4020, 39.9556],
      'Shenzhen': [22.5431, 114.0579],
      'Sochi': [43.6028, 39.7342],
      'Split': [43.5081, 16.4402],
      'Yerevan': [40.1872, 44.5152],
      'Zhukovsky': [55.5974, 38.1198],
      'Zurich': [47.3769, 8.5417]
    }
    // %%%%26.04.2026%%%%%%% extend the academic map to new 2026 locations in East Asia
    let markerByCity = new Map()
    let activities = []

    const cleanLocation = (location) => location
      .replace(/,?\s*\(online\)/i, '')
      .replace(/,\s*Presidium of RAS/i, '')
      .replace(/\s+/g, ' ')
      .trim()

    const createPopupContent = (city, cityActivities) => {
      const popup = document.createElement('div')
      const title = document.createElement('strong')
      const meta = document.createElement('span')
      const list = document.createElement('ul')

      popup.className = 'academic-map-popup'
      title.textContent = city
      meta.textContent = `${cityActivities.length} ${cityActivities.length === 1 ? 'entry' : 'entries'}`
      popup.append(title, meta)

      cityActivities.slice(0, 4).forEach((activity) => {
        const item = document.createElement('li')
        const date = document.createElement('time')
        const eventLabel = activity.url ? document.createElement('a') : document.createElement('span')

        date.textContent = activity.date
        eventLabel.textContent = activity.event
        if (activity.url) {
          eventLabel.href = activity.url
          eventLabel.target = '_blank'
          eventLabel.rel = 'noopener noreferrer'
        }

        item.append(date, eventLabel)
        list.append(item)
      })

      popup.append(list)
      if (cityActivities.length > 4) {
        const more = document.createElement('small')
        more.textContent = `+${cityActivities.length - 4} more`
        popup.append(more)
      }

      return popup
    }

    const renderLocationList = (groupedActivities) => {
      mapLocations.innerHTML = ''
      const sortedLocations = [...groupedActivities.entries()].sort((entryA, entryB) => (
        entryB[1].length - entryA[1].length || entryA[0].localeCompare(entryB[0])
      ))

      mapLocationCount.textContent = String(sortedLocations.length)

      if (!sortedLocations.length) {
        const emptyState = document.createElement('p')
        emptyState.className = 'academic-map-empty'
        emptyState.textContent = 'No locations match these filters.'
        mapLocations.append(emptyState)
        return
      }

      sortedLocations.forEach(([city, cityActivities]) => {
        const locationButton = document.createElement('button')
        const locationName = document.createElement('strong')
        const locationMeta = document.createElement('span')
        const locationArrow = document.createElement('i')
        const hasInPersonActivity = cityActivities.some((activity) => !activity.online)

        locationButton.type = 'button'
        locationButton.className = 'academic-map-location'
        locationName.textContent = city
        locationMeta.textContent = `${cityActivities.length} ${cityActivities.length === 1 ? 'entry' : 'entries'} · ${hasInPersonActivity ? 'in person' : 'online'}`
        locationArrow.className = 'bx bx-right-arrow-alt'
        locationArrow.setAttribute('aria-hidden', 'true')
        locationButton.append(locationName, locationMeta, locationArrow)

        locationButton.addEventListener('click', () => {
          const marker = markerByCity.get(city)
          if (marker) {
            marker.focus({ preventScroll: true })
            marker.click()
            mapCanvas.scrollIntoView({
              behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
              block: 'center'
            })
          }
        })

        mapLocations.append(locationButton)
      })
    }

    const updateAcademicMap = () => {
      const selectedYear = mapYearFilter.value
      const selectedType = mapTypeFilter.value
      const selectedMode = mapModeFilter.value
      const filteredActivities = activities.filter((activity) => {
        const matchesYear = selectedYear === 'all' || activity.year === selectedYear
        const matchesType = selectedType === 'all' || activity.type === selectedType
        const matchesMode = selectedMode === 'all'
          || (selectedMode === 'online' ? activity.online : !activity.online)
        return matchesYear && matchesType && matchesMode
      })
      const groupedActivities = filteredActivities.reduce((groups, activity) => {
        if (!cityCoordinates[activity.city]) return groups
        if (!groups.has(activity.city)) groups.set(activity.city, [])
        groups.get(activity.city).push(activity)
        return groups
      }, new Map())

      markerByCity = new Map()
      mapMarkerLayer.innerHTML = ''
      mapPopup.hidden = true

      groupedActivities.forEach((cityActivities, city) => {
        const coordinates = cityCoordinates[city]
        const hasInPersonActivity = cityActivities.some((activity) => !activity.online)
        const marker = document.createElement('button')
        const markerCount = document.createElement('span')
        const latitude = coordinates[0]
        const longitude = coordinates[1]
        const projectedX = Math.max(2, Math.min(98, (
          (longitude - mapBounds.minLongitude)
          / (mapBounds.maxLongitude - mapBounds.minLongitude)
        ) * 100))
        const projectedY = Math.max(5, Math.min(95, (
          (mapBounds.maxLatitude - latitude)
          / (mapBounds.maxLatitude - mapBounds.minLatitude)
        ) * 100))

        marker.type = 'button'
        marker.className = hasInPersonActivity
          ? 'academic-map-marker'
          : 'academic-map-marker academic-map-marker--online'
        marker.style.left = `${projectedX}%`
        marker.style.top = `${projectedY}%`
        marker.setAttribute('aria-label', `${city}: ${cityActivities.length} ${cityActivities.length === 1 ? 'entry' : 'entries'}`)
        markerCount.textContent = String(cityActivities.length)
        marker.append(markerCount)

        marker.addEventListener('click', () => {
          select('.academic-map-marker.is-active', true).forEach((activeMarker) => {
            activeMarker.classList.remove('is-active')
          })
          marker.classList.add('is-active')
          mapPopupContent.innerHTML = ''
          mapPopupContent.append(createPopupContent(city, cityActivities))
          mapPopup.hidden = false
        })

        mapMarkerLayer.append(marker)
        markerByCity.set(city, marker)
      })

      renderLocationList(groupedActivities)
      mapStatus.textContent = `Showing ${filteredActivities.length} entries across ${groupedActivities.size} locations.`
    }

    if (mapPopupClose) {
      mapPopupClose.addEventListener('click', () => {
        mapPopup.hidden = true
        select('.academic-map-marker.is-active', true).forEach((activeMarker) => {
          activeMarker.classList.remove('is-active')
        })
      })
    }

    const parseTalkActivities = (talksHtml) => {
      const talksDocument = new DOMParser().parseFromString(talksHtml, 'text/html')
      const talkRows = [...talksDocument.querySelectorAll('.talks-timeline tr.conference, .talks-timeline tr.summer_school')]

      return talkRows.map((row) => {
        const cells = row.querySelectorAll('td')
        if (cells.length < 4) return null

        const rawLocation = cells[3].textContent.replace(/\s+/g, ' ').trim()
        const normalizedLocation = cleanLocation(rawLocation)
        const locationParts = normalizedLocation.split(',').map((part) => part.trim())
        const sourceLink = [...row.querySelectorAll('a[href]')].find((link) => link.getAttribute('href').trim())
        const rawUrl = sourceLink ? sourceLink.getAttribute('href').trim() : ''
        const date = cells[0].textContent.replace(/\s+/g, ' ').trim()

        return {
          city: locationParts[0],
          country: locationParts[locationParts.length - 1],
          date,
          event: cells[2].textContent.replace(/\s+/g, ' ').trim(),
          online: /\(online\)/i.test(rawLocation),
          type: row.classList.contains('summer_school') ? 'event' : 'talk',
          url: rawUrl,
          year: date.match(/\b20\d{2}\b/)?.[0] || 'Other'
        }
      }).filter(Boolean)
    }

    const applyAcademicMapData = (nextActivities) => {
      activities = nextActivities.map((activity) => ({
        ...activity,
        url: activity.url ? new URL(activity.url, window.location.href).href : ''
      }))

      const inPersonActivities = activities.filter((activity) => !activity.online)
      const mapStats = {
        countries: new Set(inPersonActivities.map((activity) => activity.country)).size,
        cities: new Set(inPersonActivities.map((activity) => activity.city)).size,
        visits: inPersonActivities.length,
        online: activities.length - inPersonActivities.length
      }

      select('[data-academic-map-stat]', true).forEach((stat) => {
        stat.textContent = String(mapStats[stat.getAttribute('data-academic-map-stat')] || 0)
      })

      mapYearFilter.querySelectorAll('option:not([value="all"])').forEach((option) => {
        option.remove()
      })

      const availableYears = [...new Set(activities.map((activity) => activity.year))]
        .sort((yearA, yearB) => Number(yearB) - Number(yearA))

      availableYears.forEach((year) => {
        const option = document.createElement('option')
        option.value = year
        option.textContent = year
        mapYearFilter.append(option)
      })

      if (!availableYears.includes(mapYearFilter.value)) mapYearFilter.value = 'all'
      academicMapRoot.classList.remove('has-map-error')
      updateAcademicMap()
    }

    ;[mapYearFilter, mapTypeFilter, mapModeFilter].forEach((filter) => {
      filter.addEventListener('change', updateAcademicMap)
    })

    const embeddedMapData = select('#academic-talks-data')
    let fallbackActivities = []

    if (embeddedMapData) {
      try {
        fallbackActivities = JSON.parse(embeddedMapData.textContent)
      } catch (error) {
        console.error('Academic map embedded data:', error)
      }
    }

    if (fallbackActivities.length) {
      applyAcademicMapData(fallbackActivities)
    }

    fetch('portfolio-talks.html', { cache: 'no-cache' })
      .then((response) => {
        if (!response.ok) throw new Error('Talks page returned ' + response.status)
        return response.text()
      })
      .then((talksHtml) => {
        const currentActivities = parseTalkActivities(talksHtml)
        if (!currentActivities.length) throw new Error('Talks page contains no map activities')
        applyAcademicMapData(currentActivities)
      })
      .catch((error) => {
        if (!activities.length) {
          mapStatus.textContent = 'Talk locations could not be loaded. Please try again later.'
          academicMapRoot.classList.add('has-map-error')
          console.error('Academic map:', error)
          return
        }

        console.warn('Academic map is using the local Talks snapshot:', error)
      })
  }
  // %%%%26.04.2026%%%%%%% academic map generated from the Talks page

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    // %%%%26.04.2026%%%%%%% guard optional animation library
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      })
    }
    // %%%%26.04.2026%%%%%%% guard optional animation library
  });

  /**
   * Initiate Pure Counter
   */
  // %%%%26.04.2026%%%%%%% guard optional counter library
  if (typeof PureCounter === 'function') {
    new PureCounter();
  }
  // %%%%26.04.2026%%%%%%% guard optional counter library

})()
