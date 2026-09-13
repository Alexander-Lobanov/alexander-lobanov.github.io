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
      const primarySource = card.querySelector('.btn-publisher, .btn-arxive, .btn-donwnload')
      // %%%%26.04.2026%%%%%%% preserve inline mathematical markup inside publication title links
      const existingTitleLink = heading ? heading.querySelector(':scope > .publication-title-link') : null
      const headingNodes = heading ? [...heading.childNodes] : []
      const primarySourceIndex = primarySource ? headingNodes.indexOf(primarySource) : -1
      const titleNodes = existingTitleLink
        ? [existingTitleLink]
        : primarySourceIndex > 0
          ? headingNodes.slice(0, primarySourceIndex)
          : []
      const title = titleNodes
        .map((node) => node.textContent)
        .join('')
        .replace(/\s+/g, ' ')
        .trim()
      // %%%%26.04.2026%%%%%%% preserve inline mathematical markup inside publication title links
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

      // %%%%26.04.2026%%%%%%% wrap the complete title, including subscript elements, in one source link
      if (heading && titleNodes.length && primarySource && !existingTitleLink) {
        const firstTextNode = titleNodes.find((node) => node.nodeType === Node.TEXT_NODE)
        const lastTextNode = [...titleNodes].reverse().find((node) => node.nodeType === Node.TEXT_NODE)

        if (firstTextNode) {
          firstTextNode.textContent = firstTextNode.textContent.replace(/^[\s\u00a0]+/, '')
        }
        if (lastTextNode) {
          lastTextNode.textContent = lastTextNode.textContent.replace(/[\s\u00a0]+$/, '')
        }

        const titleLink = document.createElement('a')
        titleLink.className = 'publication-title-link'
        titleLink.href = primarySource.href
        titleLink.target = '_blank'
        titleLink.rel = 'noopener noreferrer'
        heading.insertBefore(titleLink, primarySource)
        titleNodes.forEach((node) => titleLink.append(node))
      }
      // %%%%26.04.2026%%%%%%% wrap the complete title, including subscript elements, in one source link

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
    // %%%%26.04.2026%%%%%%% crisp inline vector map and zoom controls
    const mapStage = select('[data-academic-map-stage]')
    const mapBackdrop = select('[data-academic-map-backdrop]')
    // %%%%26.04.2026%%%%%%% keep the fallback SVG synchronized while the inline vector is loading
    const mapBackdropFallback = select('.academic-map-backdrop-fallback')
    // %%%%26.04.2026%%%%%%% keep the fallback SVG synchronized while the inline vector is loading
    const mapZoomIn = select('[data-academic-map-zoom-in]')
    const mapZoomOut = select('[data-academic-map-zoom-out]')
    const mapReset = select('[data-academic-map-reset]')
    const mapZoomLevel = select('[data-academic-map-zoom-level]')
    // %%%%26.04.2026%%%%%%% crisp inline vector map and zoom controls
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
    // %%%%26.04.2026%%%%%%% searchable collapsible map locations panel
    const mapLocationsCard = select('.academic-map-locations-card')
    const mapLocationsPanel = select('[data-academic-map-locations-panel]')
    const mapLocationsToggle = select('[data-academic-map-locations-toggle]')
    const mapLocationSearch = select('[data-academic-map-location-search]')
    // %%%%26.04.2026%%%%%%% searchable collapsible map locations panel
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
    // %%%%26.04.2026%%%%%%% clustered marker and selected location state
    let groupedMapActivities = new Map()
    let selectedMapCity = ''
    let refreshMapMarkers = () => {}
    let projectedLocationByCity = new Map()
    let visibleMapActivities = []
    let mapSvg = null
    // %%%%26.04.2026%%%%%%% cached country polygons validate that labels stay inside their borders
    let mapCountryPolygons = new Map()
    // %%%%26.04.2026%%%%%%% cached country polygons validate that labels stay inside their borders
    // %%%%26.04.2026%%%%%%% clustered marker and selected location state

    // %%%%26.04.2026%%%%%%% viewBox zoom keeps geography sharp and adds progressive detail
    const mapMinZoom = 1
    const mapMaxZoom = 4
    const mapZoomStep = 0.5
    const mapCoordinateWidth = 1200
    const mapCoordinateHeight = 600
    const mapCountryAliases = {
      UAE: 'United Arab Emirates'
    }
    let mapZoom = mapMinZoom
    let mapCenterX = mapCoordinateWidth / 2
    let mapCenterY = mapCoordinateHeight / 2
    let mapDragState = null
    let mapPinchState = null

    const normalizeMapCountryName = (country) => mapCountryAliases[country] || country

    const getMapViewBox = (zoom = mapZoom) => {
      const width = mapCoordinateWidth / zoom
      const height = mapCoordinateHeight / zoom
      mapCenterX = Math.max(width / 2, Math.min(mapCoordinateWidth - width / 2, mapCenterX))
      mapCenterY = Math.max(height / 2, Math.min(mapCoordinateHeight - height / 2, mapCenterY))
      return {
        x: mapCenterX - width / 2,
        y: mapCenterY - height / 2,
        width,
        height
      }
    }

    const getMapStagePoint = (clientX, clientY) => {
      const stageBounds = mapStage.getBoundingClientRect()
      return {
        x: Math.max(0, Math.min(stageBounds.width, clientX - stageBounds.left)),
        y: Math.max(0, Math.min(stageBounds.height, clientY - stageBounds.top))
      }
    }

    const applyMapCountryHighlights = () => {
      if (!mapSvg) return
      const countryKinds = visibleMapActivities
        .filter((activity) => !activity.online)
        .reduce((countries, activity) => {
          const country = normalizeMapCountryName(activity.country)
          if (!countries.has(country)) countries.set(country, new Set())
          countries.get(country).add(activity.type)
          return countries
        }, new Map())
      mapSvg.querySelectorAll('[data-country]').forEach((element) => {
        const kinds = countryKinds.get(element.dataset.country) || new Set()
        element.classList.toggle('is-visited', kinds.size > 0)
        element.classList.toggle('is-visited-talk', kinds.has('talk') && !kinds.has('event'))
        element.classList.toggle('is-visited-event', kinds.has('event') && !kinds.has('talk'))
        element.classList.toggle('is-visited-mixed', kinds.has('talk') && kinds.has('event'))
      })
    }

    // %%%%26.04.2026%%%%%%% scale country names with geography and keep them inside country borders
    const parseMapPathPolygons = (pathData) => {
      const tokens = pathData.match(/[MLZ]|-?\d*\.?\d+/gi) || []
      const polygons = []
      let polygon = []
      let command = ''

      for (let index = 0; index < tokens.length; index += 1) {
        const token = tokens[index]
        if (/^[MLZ]$/i.test(token)) {
          command = token.toUpperCase()
          if (command === 'M' && polygon.length) {
            polygons.push(polygon)
            polygon = []
          } else if (command === 'Z' && polygon.length) {
            polygons.push(polygon)
            polygon = []
          }
          continue
        }

        if ((command === 'M' || command === 'L') && index + 1 < tokens.length) {
          polygon.push({ x: Number(token), y: Number(tokens[index + 1]) })
          index += 1
          if (command === 'M') command = 'L'
        }
      }

      if (polygon.length) polygons.push(polygon)
      return polygons.filter((points) => points.length >= 3)
    }

    const cacheMapCountryPolygons = () => {
      mapCountryPolygons = new Map()
      if (!mapSvg) return

      mapSvg.querySelectorAll('.map-country[data-country]').forEach((countryPath) => {
        const polygons = parseMapPathPolygons(countryPath.getAttribute('d') || '').map((points) => ({
          points,
          minX: Math.min(...points.map((point) => point.x)),
          maxX: Math.max(...points.map((point) => point.x)),
          minY: Math.min(...points.map((point) => point.y)),
          maxY: Math.max(...points.map((point) => point.y))
        }))
        if (!mapCountryPolygons.has(countryPath.dataset.country)) {
          mapCountryPolygons.set(countryPath.dataset.country, [])
        }
        mapCountryPolygons.get(countryPath.dataset.country).push(...polygons)
      })
    }

    const isMapPointInPolygon = (point, polygon) => {
      let inside = false
      for (let index = 0, previous = polygon.length - 1; index < polygon.length; previous = index, index += 1) {
        const currentPoint = polygon[index]
        const previousPoint = polygon[previous]
        const crossesRay = (currentPoint.y > point.y) !== (previousPoint.y > point.y)
          && point.x < (previousPoint.x - currentPoint.x) * (point.y - currentPoint.y)
          / (previousPoint.y - currentPoint.y) + currentPoint.x
        if (crossesRay) inside = !inside
      }
      return inside
    }

    const isMapPointInCountry = (point, polygons) => polygons.reduce((inside, polygon) => {
      if (
        point.x < polygon.minX
        || point.x > polygon.maxX
        || point.y < polygon.minY
        || point.y > polygon.maxY
      ) return inside
      return inside !== isMapPointInPolygon(point, polygon.points)
    }, false)

    const resolveMapCountryLabelCollisions = () => {
      if (!mapSvg) return

      const stageBounds = mapStage.getBoundingClientRect()
      const viewBox = getMapViewBox()
      // %%%%26.04.2026%%%%%%% keep country names clear of markers and map controls
      const acceptedBounds = Array.from(mapCanvas.querySelectorAll(
        '.academic-map-marker:not(.is-outside-view), .academic-map-city-label, .academic-map-controls'
      ))
        .filter((element) => {
          const style = getComputedStyle(element)
          return style.display !== 'none' && style.visibility !== 'hidden'
        })
        .map((element) => element.getBoundingClientRect())
      // %%%%26.04.2026%%%%%%% keep country names clear of markers and map controls
      const labels = Array.from(mapSvg.querySelectorAll('.map-country-label'))
      const labelOffsets = [
        [0, 0],
        [0, -24], [0, 24], [-42, 0], [42, 0],
        [-34, -22], [34, -22], [-34, 22], [34, 22],
        [0, -48], [0, 48], [-76, 0], [76, 0]
      ]
      const getVisibleCountryCandidates = (country) => {
        const polygons = mapCountryPolygons.get(country) || []
        if (!polygons.length) return []

        const countryBounds = polygons.reduce((bounds, polygon) => ({
          minX: Math.min(bounds.minX, polygon.minX),
          maxX: Math.max(bounds.maxX, polygon.maxX),
          minY: Math.min(bounds.minY, polygon.minY),
          maxY: Math.max(bounds.maxY, polygon.maxY)
        }), { minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity })
        const visibleBounds = {
          minX: Math.max(viewBox.x, countryBounds.minX),
          maxX: Math.min(viewBox.x + viewBox.width, countryBounds.maxX),
          minY: Math.max(viewBox.y, countryBounds.minY),
          maxY: Math.min(viewBox.y + viewBox.height, countryBounds.maxY)
        }
        if (visibleBounds.minX >= visibleBounds.maxX || visibleBounds.minY >= visibleBounds.maxY) return []

        // %%%%26.04.2026%%%%%%% include narrow visible strips near every viewport edge
        const candidateRatios = [0.08, 0.16, 0.25, 0.38, 0.5, 0.62, 0.75, 0.84, 0.92]
        const candidates = []
        candidateRatios.forEach((verticalRatio) => {
          candidateRatios.forEach((horizontalRatio) => {
            candidates.push({
              x: visibleBounds.minX + (visibleBounds.maxX - visibleBounds.minX) * horizontalRatio,
              y: visibleBounds.minY + (visibleBounds.maxY - visibleBounds.minY) * verticalRatio
            })
          })
        })
        // %%%%26.04.2026%%%%%%% include narrow visible strips near every viewport edge
        const visibleCenter = {
          x: (visibleBounds.minX + visibleBounds.maxX) / 2,
          y: (visibleBounds.minY + visibleBounds.maxY) / 2
        }
        return candidates.sort((first, second) => (
          Math.hypot(first.x - visibleCenter.x, first.y - visibleCenter.y)
          - Math.hypot(second.x - visibleCenter.x, second.y - visibleCenter.y)
        ))
      }
      // %%%%26.04.2026%%%%%%% major country names remain visible from the overview scale
      const isEligible = (label) => (
        label.classList.contains('is-visited')
        || label.classList.contains('map-country-label--major')
        || (mapZoom >= 2.2 && label.classList.contains('map-country-label--standard'))
        || (mapZoom >= 3.6 && label.classList.contains('map-country-label--minor'))
      )
      // %%%%26.04.2026%%%%%%% major country names remain visible from the overview scale
      const priority = (label) => {
        if (label.classList.contains('is-visited')) return 0
        if (label.classList.contains('map-country-label--major')) return 1
        if (label.classList.contains('map-country-label--standard')) return 2
        return 3
      }
      const fitsInsideCountry = (label, bounds) => {
        const polygons = mapCountryPolygons.get(label.dataset.country) || []
        if (!polygons.length || !bounds.width || !bounds.height) return false

        const horizontalSamples = [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1]
        const verticalSamples = [0, 0.25, 0.5, 0.75, 1]
        return horizontalSamples.every((horizontalRatio) => verticalSamples.every((verticalRatio) => {
          const clientX = bounds.left + bounds.width * horizontalRatio
          const clientY = bounds.top + bounds.height * verticalRatio
          const mapPoint = {
            x: viewBox.x + (clientX - stageBounds.left) / stageBounds.width * viewBox.width,
            y: viewBox.y + (clientY - stageBounds.top) / stageBounds.height * viewBox.height
          }
          return isMapPointInCountry(mapPoint, polygons)
        }))
      }

      // %%%%26.04.2026%%%%%%% relocate important country names before hiding them
      labels.forEach((label) => {
        if (!label.dataset.mapLabelBaseX) label.dataset.mapLabelBaseX = label.getAttribute('x') || '0'
        if (!label.dataset.mapLabelBaseY) label.dataset.mapLabelBaseY = label.getAttribute('y') || '0'
        label.setAttribute('x', label.dataset.mapLabelBaseX)
        label.setAttribute('y', label.dataset.mapLabelBaseY)
        label.classList.remove('is-collision-hidden')
      })
      labels
        .filter(isEligible)
        .sort((first, second) => priority(first) - priority(second))
        .forEach((label) => {
          const baseX = Number(label.dataset.mapLabelBaseX)
          const baseY = Number(label.dataset.mapLabelBaseY)
          const mapUnitsPerPixelX = viewBox.width / stageBounds.width
          const mapUnitsPerPixelY = viewBox.height / stageBounds.height
          // %%%%26.04.2026%%%%%%% search the visible country area when the original label point is off-screen
          const labelPositions = labelOffsets.map(([offsetX, offsetY]) => ({
            x: baseX + offsetX * mapUnitsPerPixelX,
            y: baseY + offsetY * mapUnitsPerPixelY
          }))
          labelPositions.push(...getVisibleCountryCandidates(label.dataset.country))
          // %%%%26.04.2026%%%%%%% search the visible country area when the original label point is off-screen
          let placedBounds = null

          for (const position of labelPositions) {
            label.setAttribute('x', String(position.x))
            label.setAttribute('y', String(position.y))
            const bounds = label.getBoundingClientRect()
            const isClipped = bounds.left < stageBounds.left + 3
              || bounds.right > stageBounds.right - 3
              || bounds.top < stageBounds.top + 3
              || bounds.bottom > stageBounds.bottom - 3
            const exceedsCountry = !fitsInsideCountry(label, bounds)
            const overlaps = acceptedBounds.some((accepted) => !(
              bounds.right + 10 < accepted.left
              || bounds.left - 10 > accepted.right
              || bounds.bottom + 7 < accepted.top
              || bounds.top - 7 > accepted.bottom
            ))

            if (!isClipped && !exceedsCountry && !overlaps) {
              placedBounds = bounds
              break
            }
          }

          label.classList.toggle('is-collision-hidden', !placedBounds)
          if (placedBounds) acceptedBounds.push(placedBounds)
        })
      // %%%%26.04.2026%%%%%%% relocate important country names before hiding them
    }

    const renderMapFallbackView = (viewBox) => {
      if (!mapBackdropFallback || mapSvg) return
      mapBackdropFallback.style.width = `${mapCoordinateWidth / viewBox.width * 100}%`
      mapBackdropFallback.style.height = `${mapCoordinateHeight / viewBox.height * 100}%`
      mapBackdropFallback.style.left = `${-viewBox.x / viewBox.width * 100}%`
      mapBackdropFallback.style.top = `${-viewBox.y / viewBox.height * 100}%`
    }
    // %%%%26.04.2026%%%%%%% scale country names with geography and keep them inside country borders

    const renderMapView = (refreshClusters = false) => {
      const viewBox = getMapViewBox()
      if (mapSvg) mapSvg.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`)
      renderMapFallbackView(viewBox)
      mapCanvas.style.setProperty('--academic-map-inverse-zoom', String(1 / mapZoom))
      // %%%%26.04.2026%%%%%%% keep country names readable at every viewport width and zoom level
      const mapUnitsPerScreenPixel = viewBox.width / Math.max(1, mapStage.clientWidth)
      const countryLabelScreenSize = 14 - mapZoom
      mapCanvas.style.setProperty('--academic-map-country-label-size', `${countryLabelScreenSize * mapUnitsPerScreenPixel}px`)
      mapCanvas.style.setProperty('--academic-map-country-label-stroke', `${1.5 * mapUnitsPerScreenPixel}px`)
      mapCanvas.style.setProperty('--academic-map-country-label-spacing', `${0.2 * mapUnitsPerScreenPixel}px`)
      // %%%%26.04.2026%%%%%%% keep country names readable at every viewport width and zoom level
      mapCanvas.classList.toggle('is-zoomed', mapZoom > mapMinZoom)
      // %%%%26.04.2026%%%%%%% show major country names on the initial map view
      mapCanvas.classList.toggle('has-country-labels', mapZoom >= mapMinZoom)
      // %%%%26.04.2026%%%%%%% show major country names on the initial map view
      mapCanvas.classList.toggle('has-detailed-country-labels', mapZoom >= 2.2)
      mapCanvas.classList.toggle('has-city-labels', mapZoom >= 2.8)
      mapCanvas.classList.toggle('has-minor-country-labels', mapZoom >= 3.6)
      mapCanvas.dataset.mapZoom = String(mapZoom)
      mapZoomLevel.textContent = `${Math.round(mapZoom * 100)}%`
      mapReset.setAttribute('aria-label', `Fit all locations (current zoom ${Math.round(mapZoom * 100)}%)`)
      mapZoomOut.disabled = mapZoom <= mapMinZoom
      mapZoomIn.disabled = mapZoom >= mapMaxZoom
      applyMapCountryHighlights()
      if (refreshClusters) refreshMapMarkers()
      resolveMapCountryLabelCollisions()
    }

    const setMapZoom = (nextZoom, focusPoint = null) => {
      const previousViewBox = getMapViewBox()
      const constrainedZoom = Math.max(mapMinZoom, Math.min(mapMaxZoom, nextZoom))

      if (focusPoint && constrainedZoom !== mapZoom && mapStage.clientWidth && mapStage.clientHeight) {
        const focusRatioX = focusPoint.x / mapStage.clientWidth
        const focusRatioY = focusPoint.y / mapStage.clientHeight
        const focusedMapX = previousViewBox.x + focusRatioX * previousViewBox.width
        const focusedMapY = previousViewBox.y + focusRatioY * previousViewBox.height
        const nextWidth = mapCoordinateWidth / constrainedZoom
        const nextHeight = mapCoordinateHeight / constrainedZoom
        mapCenterX = focusedMapX + nextWidth * (0.5 - focusRatioX)
        mapCenterY = focusedMapY + nextHeight * (0.5 - focusRatioY)
      }

      mapZoom = constrainedZoom
      if (mapZoom === mapMinZoom) {
        mapCenterX = mapCoordinateWidth / 2
        mapCenterY = mapCoordinateHeight / 2
      }
      renderMapView(true)
    }

    const fitMapToLocations = (locations = []) => {
      if (!locations.length) {
        mapZoom = mapMinZoom
        mapCenterX = mapCoordinateWidth / 2
        mapCenterY = mapCoordinateHeight / 2
        renderMapView(true)
        return
      }

      const mapPoints = locations.map((location) => ({
        x: location.x / 100 * mapCoordinateWidth,
        y: location.y / 100 * mapCoordinateHeight
      }))
      const minX = Math.min(...mapPoints.map((point) => point.x))
      const maxX = Math.max(...mapPoints.map((point) => point.x))
      const minY = Math.min(...mapPoints.map((point) => point.y))
      const maxY = Math.max(...mapPoints.map((point) => point.y))
      const requiredWidth = Math.max(130, maxX - minX + 150)
      const requiredHeight = Math.max(90, maxY - minY + 110)

      mapZoom = Math.max(mapMinZoom, Math.min(2.5, mapCoordinateWidth / requiredWidth, mapCoordinateHeight / requiredHeight))
      mapCenterX = (minX + maxX) / 2
      mapCenterY = (minY + maxY) / 2
      renderMapView(true)
    }

    const resetMapView = () => fitMapToLocations(projectMapLocations(groupedMapActivities))

    const focusMapOnCoordinates = (markerX, markerY, nextZoom = Math.max(mapZoom, 3)) => {
      mapZoom = Math.max(mapMinZoom, Math.min(mapMaxZoom, nextZoom))
      mapCenterX = markerX / 100 * mapCoordinateWidth
      mapCenterY = markerY / 100 * mapCoordinateHeight
      renderMapView(true)
    }

    mapZoomIn.addEventListener('click', () => setMapZoom(mapZoom + mapZoomStep))
    mapZoomOut.addEventListener('click', () => setMapZoom(mapZoom - mapZoomStep))
    mapReset.addEventListener('click', resetMapView)

    mapCanvas.addEventListener('wheel', (event) => {
      if (event.target.closest('.academic-map-controls') || (!event.ctrlKey && !event.metaKey)) return
      event.preventDefault()
      const focusPoint = getMapStagePoint(event.clientX, event.clientY)
      setMapZoom(mapZoom + (event.deltaY < 0 ? mapZoomStep : -mapZoomStep), focusPoint)
    }, { passive: false })

    mapCanvas.addEventListener('dblclick', (event) => {
      if (event.target.closest('button, a')) return
      event.preventDefault()
      setMapZoom(mapZoom + mapZoomStep, getMapStagePoint(event.clientX, event.clientY))
    })

    mapCanvas.addEventListener('pointerdown', (event) => {
      if (event.pointerType === 'touch' || event.button !== 0 || mapZoom <= mapMinZoom || event.target.closest('button, a')) return
      const viewBox = getMapViewBox()
      mapDragState = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        centerX: mapCenterX,
        centerY: mapCenterY,
        viewBox
      }
      mapCanvas.classList.add('is-dragging')
      mapCanvas.setPointerCapture(event.pointerId)
    })

    mapCanvas.addEventListener('pointermove', (event) => {
      if (!mapDragState || mapDragState.pointerId !== event.pointerId) return
      mapCenterX = mapDragState.centerX
        - (event.clientX - mapDragState.startX) / mapStage.clientWidth * mapDragState.viewBox.width
      mapCenterY = mapDragState.centerY
        - (event.clientY - mapDragState.startY) / mapStage.clientHeight * mapDragState.viewBox.height
      renderMapView(true)
    })

    const finishMapDrag = (event) => {
      if (!mapDragState || mapDragState.pointerId !== event.pointerId) return
      if (mapCanvas.hasPointerCapture(event.pointerId)) {
        mapCanvas.releasePointerCapture(event.pointerId)
      }
      mapDragState = null
      mapCanvas.classList.remove('is-dragging')
    }

    mapCanvas.addEventListener('pointerup', finishMapDrag)
    mapCanvas.addEventListener('pointercancel', finishMapDrag)

    // %%%%26.04.2026%%%%%%% two-finger mobile zoom without trapping one-finger page scrolling
    const getMapTouchMetrics = (touches) => {
      const firstTouch = touches[0]
      const secondTouch = touches[1]
      return {
        distance: Math.hypot(secondTouch.clientX - firstTouch.clientX, secondTouch.clientY - firstTouch.clientY),
        point: getMapStagePoint(
          (firstTouch.clientX + secondTouch.clientX) / 2,
          (firstTouch.clientY + secondTouch.clientY) / 2
        )
      }
    }

    mapCanvas.addEventListener('touchstart', (event) => {
      if (event.touches.length !== 2) return
      event.preventDefault()
      const metrics = getMapTouchMetrics(event.touches)
      const viewBox = getMapViewBox()
      mapPinchState = {
        distance: metrics.distance,
        zoom: mapZoom,
        mapX: viewBox.x + metrics.point.x / mapStage.clientWidth * viewBox.width,
        mapY: viewBox.y + metrics.point.y / mapStage.clientHeight * viewBox.height
      }
    }, { passive: false })

    mapCanvas.addEventListener('touchmove', (event) => {
      if (!mapPinchState || event.touches.length !== 2) return
      event.preventDefault()
      const metrics = getMapTouchMetrics(event.touches)
      const nextZoom = Math.max(mapMinZoom, Math.min(mapMaxZoom, mapPinchState.zoom * metrics.distance / mapPinchState.distance))
      const nextWidth = mapCoordinateWidth / nextZoom
      const nextHeight = mapCoordinateHeight / nextZoom
      const focusRatioX = metrics.point.x / mapStage.clientWidth
      const focusRatioY = metrics.point.y / mapStage.clientHeight

      mapZoom = nextZoom
      mapCenterX = mapPinchState.mapX + nextWidth * (0.5 - focusRatioX)
      mapCenterY = mapPinchState.mapY + nextHeight * (0.5 - focusRatioY)
      renderMapView(true)
    }, { passive: false })

    mapCanvas.addEventListener('touchend', (event) => {
      if (event.touches.length < 2) mapPinchState = null
    })

    mapCanvas.addEventListener('touchcancel', () => {
      mapPinchState = null
    })
    // %%%%26.04.2026%%%%%%% two-finger mobile zoom without trapping one-finger page scrolling

    mapCanvas.addEventListener('keydown', (event) => {
      if (event.target !== mapCanvas) return

      if (event.key === '+' || event.key === '=') {
        event.preventDefault()
        setMapZoom(mapZoom + mapZoomStep)
      } else if (event.key === '-') {
        event.preventDefault()
        setMapZoom(mapZoom - mapZoomStep)
      } else if (event.key === '0') {
        event.preventDefault()
        resetMapView()
      } else if (mapZoom > mapMinZoom && ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
        event.preventDefault()
        const panStep = event.shiftKey ? 70 : 32
        const viewBox = getMapViewBox()
        if (event.key === 'ArrowLeft') mapCenterX -= panStep / mapStage.clientWidth * viewBox.width
        if (event.key === 'ArrowRight') mapCenterX += panStep / mapStage.clientWidth * viewBox.width
        if (event.key === 'ArrowUp') mapCenterY -= panStep / mapStage.clientHeight * viewBox.height
        if (event.key === 'ArrowDown') mapCenterY += panStep / mapStage.clientHeight * viewBox.height
        renderMapView(true)
      }
    })

    window.addEventListener('resize', () => renderMapView(true))

    // %%%%26.04.2026%%%%%%% load the local SVG into the page so viewBox zoom is rerendered as vector
    const loadAcademicMapVector = async () => {
      try {
        const response = await fetch(mapBackdrop.dataset.mapSource)
        if (!response.ok) throw new Error(`Map request failed with status ${response.status}`)
        const mapDocument = new DOMParser().parseFromString(await response.text(), 'image/svg+xml')
        if (mapDocument.querySelector('parsererror')) throw new Error('Map SVG could not be parsed')
        const sourceSvg = mapDocument.documentElement
        sourceSvg.querySelectorAll('script, foreignObject').forEach((element) => element.remove())
        // %%%%26.04.2026%%%%%%% enable labels only after interactive size and border checks are available
        sourceSvg.querySelector('.map-region-labels')?.removeAttribute('opacity')
        sourceSvg.querySelector('.map-country-labels')?.removeAttribute('opacity')
        // %%%%26.04.2026%%%%%%% enable labels only after interactive size and border checks are available
        sourceSvg.classList.add('academic-map-vector')
        sourceSvg.setAttribute('aria-hidden', 'true')
        sourceSvg.removeAttribute('role')
        mapBackdrop.replaceChildren(document.importNode(sourceSvg, true))
        mapSvg = mapBackdrop.querySelector('svg')
        cacheMapCountryPolygons()
        mapCanvas.classList.add('has-vector-map')
        renderMapView(true)
      } catch (error) {
        mapCanvas.classList.add('has-static-map')
      }
    }

    renderMapView()
    loadAcademicMapVector()
    // %%%%26.04.2026%%%%%%% load the local SVG into the page so viewBox zoom is rerendered as vector
    // %%%%26.04.2026%%%%%%% viewBox zoom keeps geography sharp and adds progressive detail

    const cleanLocation = (location) => location
      .replace(/,?\s*\(online\)/i, '')
      .replace(/,\s*Presidium of RAS/i, '')
      .replace(/\s+/g, ' ')
      .trim()

    // %%%%26.04.2026%%%%%%% selected location card, typed markers and screen-distance clustering
    const getActivityKind = (cityActivities) => {
      const hasTalk = cityActivities.some((activity) => activity.type === 'talk')
      const hasEvent = cityActivities.some((activity) => activity.type === 'event')
      if (hasTalk && hasEvent) return 'mixed'
      return hasEvent ? 'event' : 'talk'
    }

    const createPopupBadge = (label, type) => {
      const badge = document.createElement('span')
      badge.className = `academic-map-popup-badge academic-map-popup-badge--${type}`
      badge.textContent = label
      return badge
    }

    const createPopupContent = (city, cityActivities) => {
      const popup = document.createElement('div')
      const summary = document.createElement('div')
      const title = document.createElement('strong')
      const meta = document.createElement('span')
      const badges = document.createElement('div')
      const allTalksLink = document.createElement('a')
      const list = document.createElement('ul')
      const country = cityActivities[0]?.country || ''
      const talkCount = cityActivities.filter((activity) => activity.type === 'talk').length
      const eventCount = cityActivities.length - talkCount

      popup.className = 'academic-map-popup'
      summary.className = 'academic-map-popup-summary'
      badges.className = 'academic-map-popup-badges'
      title.textContent = country ? `${city}, ${country}` : city
      meta.textContent = `${cityActivities.length} ${cityActivities.length === 1 ? 'entry' : 'entries'}`
      if (talkCount) badges.append(createPopupBadge(`${talkCount} ${talkCount === 1 ? 'talk' : 'talks'}`, 'talk'))
      if (eventCount) badges.append(createPopupBadge(`${eventCount} ${eventCount === 1 ? 'event' : 'events'}`, 'event'))
      allTalksLink.className = 'academic-map-popup-all'
      allTalksLink.href = 'portfolio-talks.html'
      allTalksLink.innerHTML = 'View on Talks page <i class="bx bx-right-arrow-alt" aria-hidden="true"></i>'
      summary.append(title, meta, badges, allTalksLink)

      cityActivities.slice(0, 4).forEach((activity) => {
        const item = document.createElement('li')
        const date = document.createElement('time')
        const eventLabel = activity.url ? document.createElement('a') : document.createElement('span')

        item.className = `academic-map-popup-item academic-map-popup-item--${activity.type}`
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

      if (cityActivities.length > 4) {
        const more = document.createElement('small')
        more.textContent = `+${cityActivities.length - 4} more entries on the Talks page`
        summary.insertBefore(more, allTalksLink)
      }

      popup.append(summary, list)
      return popup
    }

    const clearActiveMapLocation = () => {
      selectedMapCity = ''
      select('.academic-map-marker.is-active', true).forEach((activeMarker) => activeMarker.classList.remove('is-active'))
      select('.academic-map-location.is-active', true).forEach((activeLocation) => activeLocation.classList.remove('is-active'))
      mapPopup.hidden = true
    }

    const selectMapLocation = (city, cityActivities, marker) => {
      selectedMapCity = city
      select('.academic-map-marker.is-active', true).forEach((activeMarker) => activeMarker.classList.remove('is-active'))
      select('.academic-map-location.is-active', true).forEach((activeLocation) => activeLocation.classList.remove('is-active'))
      if (marker) marker.classList.add('is-active')
      select('.academic-map-location', true).forEach((locationButton) => {
        if (locationButton.dataset.mapCity === city) locationButton.classList.add('is-active')
      })
      mapPopupContent.innerHTML = ''
      mapPopupContent.append(createPopupContent(city, cityActivities))
      mapPopup.hidden = false
    }

    const projectMapLocations = (groupedActivities) => [...groupedActivities.entries()].map(([city, cityActivities]) => {
      const coordinates = cityCoordinates[city]
      const latitude = coordinates[0]
      const longitude = coordinates[1]
      return {
        city,
        activities: cityActivities,
        x: Math.max(2, Math.min(98, (
          (longitude - mapBounds.minLongitude)
          / (mapBounds.maxLongitude - mapBounds.minLongitude)
        ) * 100)),
        y: Math.max(5, Math.min(95, (
          (mapBounds.maxLatitude - latitude)
          / (mapBounds.maxLatitude - mapBounds.minLatitude)
        ) * 100))
      }
    })

    // %%%%26.04.2026%%%%%%% project geographic points through the active SVG viewBox
    const getMapScreenPosition = (location) => {
      const viewBox = getMapViewBox()
      const mapX = location.x / 100 * mapCoordinateWidth
      const mapY = location.y / 100 * mapCoordinateHeight
      return {
        x: (mapX - viewBox.x) / viewBox.width * 100,
        y: (mapY - viewBox.y) / viewBox.height * 100
      }
    }
    // %%%%26.04.2026%%%%%%% project geographic points through the active SVG viewBox

    const clusterMapLocations = (locations, threshold) => {
      const viewBox = getMapViewBox()
      const stageWidth = mapStage.offsetWidth
      const stageHeight = mapStage.offsetHeight
      const clusters = []

      locations.forEach((location) => {
        const nearestCluster = clusters.find((cluster) => {
          const distanceX = (location.x - cluster.x) / 100 * mapCoordinateWidth / viewBox.width * stageWidth
          const distanceY = (location.y - cluster.y) / 100 * mapCoordinateHeight / viewBox.height * stageHeight
          return Math.hypot(distanceX, distanceY) < threshold
        })

        if (!nearestCluster) {
          clusters.push({ x: location.x, y: location.y, locations: [location] })
          return
        }

        nearestCluster.locations.push(location)
        nearestCluster.x = nearestCluster.locations.reduce((sum, item) => sum + item.x, 0) / nearestCluster.locations.length
        nearestCluster.y = nearestCluster.locations.reduce((sum, item) => sum + item.y, 0) / nearestCluster.locations.length
      })

      return clusters
    }

    // %%%%26.04.2026%%%%%%% accessible city labels, hover details and spider connector lines
    const createMapMarkerTooltip = (titleText, metaText) => {
      const tooltip = document.createElement('span')
      const title = document.createElement('strong')
      const meta = document.createElement('small')
      tooltip.className = 'academic-map-marker-tooltip'
      title.textContent = titleText
      meta.textContent = metaText
      tooltip.append(title, meta)
      return tooltip
    }

    const createMapLeaderLine = (location, offset) => {
      if (!offset.x && !offset.y) return
      const position = getMapScreenPosition(location)
      const line = document.createElement('span')
      const lineLength = Math.hypot(offset.x, offset.y)
      line.className = 'academic-map-leader-line'
      line.style.left = `${position.x}%`
      line.style.top = `${position.y}%`
      line.style.width = `${lineLength}px`
      line.style.transform = `rotate(${Math.atan2(offset.y, offset.x)}rad)`
      mapMarkerLayer.append(line)
    }

    const createMapMarker = (location, offset = { x: 0, y: 0 }) => {
      const marker = document.createElement('button')
      const markerCount = document.createElement('span')
      const cityLabel = document.createElement('span')
      const kind = getActivityKind(location.activities)
      const isOnlineOnly = location.activities.every((activity) => activity.online)
      const country = location.activities[0]?.country || ''
      const position = getMapScreenPosition(location)
      const labelSide = Math.abs(offset.x) > Math.abs(offset.y)
        ? (offset.x > 0 ? 'east' : 'west')
        : (offset.y < 0 ? 'north' : 'south')

      marker.type = 'button'
      marker.className = `academic-map-marker academic-map-marker--${kind}${isOnlineOnly ? ' academic-map-marker--online' : ''}`
      marker.style.left = `${position.x}%`
      marker.style.top = `${position.y}%`
      marker.style.marginLeft = `${offset.x}px`
      marker.style.marginTop = `${offset.y}px`
      marker.dataset.mapX = String(location.x)
      marker.dataset.mapY = String(location.y)
      marker.dataset.labelSide = labelSide
      marker.dataset.tooltipSide = position.y < 16 ? 'below' : 'above'
      marker.setAttribute('aria-label', `${location.city}: ${location.activities.length} ${location.activities.length === 1 ? 'entry' : 'entries'}`)
      markerCount.className = 'academic-map-marker-count'
      markerCount.textContent = String(location.activities.length)
      cityLabel.className = 'academic-map-city-label'
      cityLabel.textContent = location.city
      marker.append(
        markerCount,
        cityLabel,
        createMapMarkerTooltip(
          country ? `${location.city}, ${country}` : location.city,
          `${location.activities.length} ${location.activities.length === 1 ? 'entry' : 'entries'}`
        )
      )
      if (selectedMapCity === location.city) marker.classList.add('is-active')
      if (position.x < -6 || position.x > 106 || position.y < -8 || position.y > 108) {
        marker.classList.add('is-outside-view')
        marker.tabIndex = -1
      }

      marker.addEventListener('click', () => selectMapLocation(location.city, location.activities, marker))
      createMapLeaderLine(location, offset)
      mapMarkerLayer.append(marker)
      markerByCity.set(location.city, marker)
    }
    // %%%%26.04.2026%%%%%%% accessible city labels, hover details and spider connector lines

    const renderMapMarkers = (groupedActivities) => {
      markerByCity = new Map()
      mapMarkerLayer.innerHTML = ''
      const projectedLocations = projectMapLocations(groupedActivities)
      projectedLocationByCity = new Map(projectedLocations.map((location) => [location.city, location]))
      const collisionGroups = clusterMapLocations(projectedLocations, mapZoom < 2.8 ? 46 : 34)

      if (mapZoom < 2.8) {
        collisionGroups.forEach((cluster) => {
          if (cluster.locations.length === 1) {
            createMapMarker(cluster.locations[0])
            return
          }

          const marker = document.createElement('button')
          const count = document.createElement('span')
          const totalEntries = cluster.locations.reduce((sum, location) => sum + location.activities.length, 0)
          const cityNames = cluster.locations.map((location) => location.city)
          const position = getMapScreenPosition(cluster)

          marker.type = 'button'
          marker.className = 'academic-map-marker academic-map-marker--cluster'
          marker.style.left = `${position.x}%`
          marker.style.top = `${position.y}%`
          marker.dataset.mapX = String(cluster.x)
          marker.dataset.mapY = String(cluster.y)
          marker.dataset.tooltipSide = position.y < 16 ? 'below' : 'above'
          marker.setAttribute('aria-label', `${totalEntries} entries across ${cityNames.join(', ')}`)
          count.className = 'academic-map-marker-count'
          count.textContent = String(totalEntries)
          marker.append(count, createMapMarkerTooltip(cityNames.join(', '), `${totalEntries} grouped entries`))
          if (position.x < -6 || position.x > 106 || position.y < -8 || position.y > 108) {
            marker.classList.add('is-outside-view')
            marker.tabIndex = -1
          }
          marker.addEventListener('click', () => focusMapOnCoordinates(cluster.x, cluster.y, Math.max(3, mapZoom + 1.5)))
          mapMarkerLayer.append(marker)
          cluster.locations.forEach((location) => markerByCity.set(location.city, marker))
        })
        return
      }

      collisionGroups.forEach((cluster) => {
        const radius = cluster.locations.length > 2 ? 25 : 20
        cluster.locations.forEach((location, index) => {
          if (cluster.locations.length === 1) {
            createMapMarker(location)
            return
          }
          const angle = -Math.PI / 2 + index * (Math.PI * 2 / cluster.locations.length)
          createMapMarker(location, {
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius
          })
        })
      })
    }

    refreshMapMarkers = () => renderMapMarkers(groupedMapActivities)

    const renderLocationList = (groupedActivities) => {
      mapLocations.innerHTML = ''
      const searchQuery = mapLocationSearch.value.trim().toLocaleLowerCase()
      const sortedLocations = [...groupedActivities.entries()].sort((entryA, entryB) => (
        entryB[1].length - entryA[1].length || entryA[0].localeCompare(entryB[0])
      ))
      const visibleLocations = sortedLocations.filter(([city]) => city.toLocaleLowerCase().includes(searchQuery))

      mapLocationCount.textContent = String(sortedLocations.length)

      if (!visibleLocations.length) {
        const emptyState = document.createElement('p')
        emptyState.className = 'academic-map-empty'
        emptyState.textContent = searchQuery ? 'No cities match your search.' : 'No locations match these filters.'
        mapLocations.append(emptyState)
        return
      }

      visibleLocations.forEach(([city, cityActivities]) => {
        const locationButton = document.createElement('button')
        const locationName = document.createElement('strong')
        const locationMeta = document.createElement('span')
        const locationArrow = document.createElement('i')
        const kind = getActivityKind(cityActivities)
        const kindLabel = kind === 'mixed' ? 'talks & events' : kind === 'event' ? 'academic events' : 'talks'

        locationButton.type = 'button'
        locationButton.className = `academic-map-location${selectedMapCity === city ? ' is-active' : ''}`
        locationButton.dataset.mapCity = city
        locationName.textContent = city
        locationMeta.textContent = `${cityActivities.length} ${cityActivities.length === 1 ? 'entry' : 'entries'} · ${kindLabel}`
        locationArrow.className = 'bx bx-right-arrow-alt'
        locationArrow.setAttribute('aria-hidden', 'true')
        locationButton.append(locationName, locationMeta, locationArrow)

        locationButton.addEventListener('click', () => {
          const projectedLocation = projectedLocationByCity.get(city)
          if (!projectedLocation) return
          focusMapOnCoordinates(projectedLocation.x, projectedLocation.y, Math.max(mapZoom, 3))
          const marker = markerByCity.get(city)
          selectMapLocation(city, cityActivities, marker)
          setLocationsPanelOpen(false)
          mapCanvas.scrollIntoView({
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
            block: 'center'
          })
        })

        mapLocations.append(locationButton)
      })
    }
    // %%%%26.04.2026%%%%%%% selected location card, typed markers and screen-distance clustering

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

      // %%%%26.04.2026%%%%%%% fit the map to every filtered result and synchronize country highlighting
      mapLocationSearch.value = ''
      visibleMapActivities = filteredActivities
      groupedMapActivities = groupedActivities
      clearActiveMapLocation()
      fitMapToLocations(projectMapLocations(groupedMapActivities))
      renderLocationList(groupedActivities)
      mapStatus.textContent = `Showing ${filteredActivities.length} entries across ${groupedActivities.size} locations.`
      // %%%%26.04.2026%%%%%%% fit the map to every filtered result and synchronize country highlighting
    }

    // %%%%26.04.2026%%%%%%% locations drawer controls and synchronized search
    const setLocationsPanelOpen = (isOpen) => {
      mapLocationsCard.classList.toggle('is-open', isOpen)
      mapLocationsPanel.hidden = !isOpen
      mapLocationsToggle.setAttribute('aria-expanded', String(isOpen))
      const toggleLabel = mapLocationsToggle.querySelector('span')
      if (toggleLabel) toggleLabel.textContent = isOpen ? 'Close locations' : 'Browse locations'
      if (isOpen) window.setTimeout(() => mapLocationSearch.focus(), 0)
    }

    mapLocationsToggle.addEventListener('click', () => {
      setLocationsPanelOpen(mapLocationsToggle.getAttribute('aria-expanded') !== 'true')
    })

    mapLocationSearch.addEventListener('input', () => renderLocationList(groupedMapActivities))

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && mapLocationsToggle.getAttribute('aria-expanded') === 'true') {
        setLocationsPanelOpen(false)
        mapLocationsToggle.focus()
      }
    })

    if (mapPopupClose) mapPopupClose.addEventListener('click', clearActiveMapLocation)
    // %%%%26.04.2026%%%%%%% locations drawer controls and synchronized search

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
