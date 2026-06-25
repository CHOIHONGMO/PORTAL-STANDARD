package com.portal.common.pagination;

import org.egovframe.rte.ptl.mvc.tags.ui.pagination.AbstractPaginationRenderer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.context.ServletContextAware;

import jakarta.servlet.ServletContext;

/**
 * ImagePaginationRenderer.java 클래스
 *
 * @author ST-Ones Corp.
 */
public class RenewPaginationRenderer extends AbstractPaginationRenderer implements ServletContextAware{
	
	private static final Logger LOGGER = LoggerFactory.getLogger(RenewPaginationRenderer.class);

	private ServletContext servletContext;

	public RenewPaginationRenderer() {
		// no-op
	}

	public void initVariables(){
		if (LOGGER.isDebugEnabled()) {
			LOGGER.debug("getContextPath={}", servletContext.getContextPath());
		}
		
        firstPageLabel    = "<li class=\"btn\"><a href=\"?pageIndex={1}\" onclick=\"{0}({1});return false; \" class=\"first\">처음</a></li>";
        previousPageLabel = "<li class=\"btn\"><a href=\"?pageIndex={1}\" onclick=\"{0}({1});return false; \" class=\"btn prev\">이전</a></li>";
        currentPageLabel  = "<li><strong>{0}</strong></li>";
        otherPageLabel    = "<li><a href=\"?pageIndex={1}\" onclick=\"{0}({1});return false; \">{2}</a></li>";
        nextPageLabel     = "<li class=\"btn\"><a href=\"?pageIndex={1}\" onclick=\"{0}({1});return false; \" class=\"btn next\">다음</a></li>";
        lastPageLabel     = "<li class=\"btn\"><a href=\"?pageIndex={1}\" onclick=\"{0}({1});return false; \" class=\"btn last\">마지막</a></li>";
	}

	@Override
	public void setServletContext(ServletContext servletContext) {
		this.servletContext = servletContext;
		initVariables();
	}
}
