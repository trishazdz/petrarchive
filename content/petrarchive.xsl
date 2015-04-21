<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="1.0"
    xmlns:eg="http://www.tei-c.org/ns/Examples"
    xmlns:tei="http://www.tei-c.org/ns/1.0" 
    xmlns:xd="http://www.oxygenxml.com/ns/doc/xsl" 
    xmlns:exsl="http://exslt.org/common"
    xmlns:msxsl="urn:schemas-microsoft-com:xslt"
    xmlns:fn="http://www.w3.org/2005/xpath-functions"
    extension-element-prefixes="exsl msxsl"
    xmlns="http://www.w3.org/1999/xhtml" 
    exclude-result-prefixes="xsl tei xd eg fn #default">
    <xsl:import href="teibp.xsl"/>
    <xsl:output method="xml" doctype-system="about:legacy-compat" encoding="UTF-8" />
        
    <xsl:param name="pbNote" select="''"/>
    
    <xsl:param name="customCSS.norm" select="concat($filePrefix,'/css/custom_norm.css')"/>
    <xsl:param name="customCSS" select="concat($filePrefix,'/css/custom.css')"/>
  
 
    <xsl:template name="siteNavigation">
      <xsl:variable name="nav">
        <xsl:copy-of select="document('../nav_content.html')"/>
      </xsl:variable>
      <xsl:copy-of select="$nav"/>
    </xsl:template>
    
    <xsl:template match="tei:g" priority="99">
      <xsl:variable name="charId" select="substring-after(@ref,'#')"/>
        <xsl:choose>
            <xsl:when test="//tei:char[@xml:id = $charId]/tei:mapping[@type = 'visual']">
              <xsl:value-of select="normalize-space(//tei:char[@xml:id = $charId]/tei:mapping[@type = 'visual'])"/>
            </xsl:when>
            <xsl:otherwise>
              <xsl:value-of select="concat('[',normalize-space(//tei:char[@xml:id = $charId]/tei:charName),']')"/>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    
    <xsl:template match="tei:cb[@n='1-of-2']">
        <xsl:variable name="mycb" select="."/>
        <div style="float:left;">
            <xsl:apply-templates select="ancestor::tei:lg[@type = 'sestina']//tei:l[preceding::tei:cb[@n = '1-of-2'] = $mycb and following::tei:cb[@n='2-of-2']]" mode="process"/>
        </div>
    </xsl:template>
    
    <xsl:template match="tei:cb[@n='2-of-2']">
        <xsl:variable name="mycb" select="."/>
        <div style="float:left; width:500px; margin-right:2em; margin-left:2em;">
            <xsl:apply-templates select="ancestor::tei:lg[@type = 'sestina']//tei:l[preceding::tei:cb[@n = '2-of-2'] = $mycb]" mode="process"/>
        </div>
    </xsl:template>
    
    <xsl:template match="tei:lg[@type = 'sestina']//tei:l[preceding::tei:cb]"/>
    <xsl:template match="tei:lg[@type = 'sestian']//tei:lg">
        <xsl:apply-templates/>
    </xsl:template>
    
    <xsl:template match="tei:lg[@type = 'sestina']//tei:l[preceding::tei:cb]" mode="process">
      <xsl:if test="@n mod 5 = 0">
      <!-- sestina line numbers -->
      <span class="lno"><xsl:value-of select="@n"/></span>
      </xsl:if>
      <xsl:element name="{local-name()}">
        <xsl:call-template name="addID"/>
        <xsl:apply-templates select="@*|node()"/>
      </xsl:element>
    </xsl:template>
    
    <xsl:param name="htmlTitle">
        <xsl:value-of select="normalize-space(/tei:TEI/tei:teiHeader/tei:fileDesc/tei:titleStmt/tei:title[1])"/>        
    </xsl:param>
    
    <xsl:template name="htmlHead">
        <head>
            <!--
            <script type="text/javascript" src="//use.typekit.net/ctk5ksw.js"></script>
            <script type="text/javascript">try{Typekit.load();}catch(e){}</script>
            -->
            <meta charset="UTF-8"/>
            <link id="maincss" rel="stylesheet" type="text/css" href="{$teibpCSS}"/>
            <link id="customcss" rel="stylesheet" type="text/css" href="{$customCSS}"/>
            <script type="text/javascript" src="{$jqueryJS}"></script>

          <!-- <script type="text/javascript" src="{$jqueryBlockUIJS}"></script>-->
          <script type="text/javascript" src="{$teibpJS}"><xsl:comment> </xsl:comment></script>
          <script type="text/javascript" src="../js/petrarchive.js"><xsl:comment> </xsl:comment></script>

            <xsl:call-template name="rendition2style"/>
            <title><xsl:value-of select="$htmlTitle"/><!-- don't leave empty. --></title>
            <xsl:if test="$includeAnalytics = true()">
                <xsl:call-template name="analytics"/>
            </xsl:if>
        </head>
    </xsl:template>
    
    <!-- Petrarchive Toolbox -->
    <xsl:template name="teibpToolbox">
      <xsl:if test="not(/tei:TEI/@xml:id = 'glossary')">
        <div id="teibpToolbox">
            <div>
                <h1 style="display:inline;">text view </h1>
                <select style="display:inline;" id="themeBox" onchange="switchCustomCSS(this);">
                    <option value="{$customCSS}" >diplomatic transcription</option>
                    <option value="{$customCSS.norm}">edited text</option>
                </select>			
            </div>
        </div>
      </xsl:if>
    </xsl:template>
    
    <xsl:variable name="htmlFooter">
      <footer>© 2013-2014 H. Wayne Storey &amp; John A. Walsh. This document is part of the Petr<em>archive</em>.<br/>
        Team: H. Wayne Storey, John A. Walsh, Isabella Magni, Grace Thomas, Allison M. McCormack (2013-14), and Laura Pence.<br/>
        <a rel="license" href="http://creativecommons.org/licenses/by/4.0/"><img alt="Creative Commons License" style="border-width:0" src="http://i.creativecommons.org/l/by/4.0/80x15.png" /></a>&#160;
        <a xmlns:cc="http://creativecommons.org/ns#" href="http://petrarchive.org" property="cc:attributionName" rel="cc:attributionURL"><span xmlns:dct="http://purl.org/dc/terms/" property="dct:title">Petr<i>archive</i></span></a> by <a href="http://www.indiana.edu/~frithome/faculty/italian/storey.shtml">H. Wayne Storey</a> and <a href="http://johnwalsh.name/">John A. Walsh</a> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>.<br/>
        Funding and support provided by the <a href="http://neh.gov/">National Endowment for the Humanities</a> and <a href="http://www.indiana.edu/">Indiana University-Bloomington</a>.<br/>
        Powered by <a href="{$teibpHome}">TEI Boilerplate</a>.
</footer>
    </xsl:variable>
  
<xd:doc><xd:desc>These lines get line numbers. Canzone is not regular.</xd:desc></xd:doc>
  <xsl:template match="tei:lg[@type = 'sonnet']//tei:l[@n = '5']|tei:lg[@type = 'sonnet']//tei:l[@n = '9']|tei:lg[@type = 'rvf070']//tei:l[@n mod 5 = 0]|tei:lg[@xml:id = 'rvf071']//tei:l[@n = 5]|tei:lg[@xml:id = 'rvf071']//tei:l[@n = 15]|tei:lg[@xml:id = 'rvf071']//tei:l[@n = 20]|tei:lg[@xml:id = 'rvf071']//tei:l[@n = 30]|tei:lg[@xml:id = 'rvf071']//tei:l[@n = 35]|tei:lg[@xml:id = 'rvf105']//tei:l[@n = 5]|tei:lg[@xml:id = 'rvf105']//tei:l[@n = 15]|tei:lg[@xml:id = 'rvf105']//tei:l[@n = 20]|tei:lg[@xml:id = 'rvf105']//tei:l[@n = 30]|tei:lg[@xml:id = 'rvf105']//tei:l[@n = 35]|tei:lg[@xml:id = 'rvf105']//tei:l[@n = 45]|tei:lg[@xml:id = 'rvf105']//tei:l[@n = 50]|tei:lg[@xml:id = 'rvf105']//tei:l[@n = 60]|tei:lg[@xml:id = 'rvf105']//tei:l[@n = 65]|tei:lg[@xml:id = 'rvf105']//tei:l[@n = 75]|tei:lg[@xml:id = 'rvf105']//tei:l[@n = 80]|tei:lg[@xml:id = 'rvf105']//tei:l[@n = 90]">
        <span class="lno"><xsl:value-of select="@n"/></span>
            <xsl:element name="{local-name()}">
                <xsl:call-template name="addID"/>
                <xsl:apply-templates select="@*|node()"/>
            </xsl:element>
    </xsl:template>
    
    <xsl:template match="*[@sameAs]">
        <xsl:param name="sameAs" select="substring-after(@sameAs,'#')"/>
        <xsl:apply-templates select="//*[@xml:id = $sameAs]"/>
    </xsl:template>
  
  <xsl:template name="pb-handler">
    <xsl:param name="n"/>
    <xsl:param name="facs"/>
    <xsl:param name="id"/>
    
    <span class="-teibp-pageNum">
      <!-- <xsl:call-template name="atts"/> -->
      <span class="-teibp-pbNote"><xsl:value-of select="$pbNote"/></span>
      <xsl:value-of select="@n"/>
      <xsl:text> </xsl:text>
    </span>
    <span class="-teibp-pbFacs">
      <a class="gallery-facs" rel="prettyPhoto[gallery1]">
        <xsl:attribute name="onclick">
          <xsl:value-of select="concat('showFacs(',$apos,$n,$apos,',',$apos,$facs,$apos,',',$apos,$id,$apos,')')"/>
        </xsl:attribute>
        <img  alt="{$altTextPbFacs}" class="-teibp-thumbnail">
          <xsl:attribute name="src">
            <xsl:value-of select="@facs"/>
          </xsl:attribute>
        </img>
      </a>
    </span>
    <!--
    <span class="petrarchive-visindex-thumbnail">
      <a href="{concat('../images/visindex/',$id,'.svg')}">
        <img src="{concat('../images/visindex/',$id,'.svg')}" 
          height="64" border="1"/>
        
      </a>
    </span>
    -->
  </xsl:template>
  
  
  
  <xsl:template match="tei:ab[@type = 'blockSubst']">
    <xsl:variable name="maniculeId" select="concat(@xml:id,'Trigger')"/>
    <div id="{$maniculeId}" class="manicule-palimpsest-trigger">
      <xsl:attribute name="onclick">
        <!-- <xsl:value-of select="concat('showHide(&quot;',$maniculeId,'&quot;,&quot;',tei:subst/tei:del/tei:lg/@xml:id, '&quot;,&quot;',tei:subst/tei:add/tei:lg/@xml:id,'&quot;)'"/> -->
        <xsl:value-of select="'JavaScript:showHide('"/>
        <xsl:value-of select="$apos"/>
        <xsl:value-of select="$maniculeId"/>
        <xsl:value-of select="concat($apos,',',$apos)"/>
        <xsl:value-of select="normalize-space(tei:subst/tei:del/tei:lg/@xml:id)"/>
        <xsl:value-of select="concat($apos,',',$apos)"/>
        <xsl:value-of select="normalize-space(tei:subst/tei:add/tei:lg/@xml:id)"/>
        <xsl:value-of select="concat($apos,')')"/>
      </xsl:attribute>  
      <xsl:value-of select="'&#x261C;'"/>
    </div>
      <xsl:element name="{local-name()}">
        <xsl:call-template name="addID"/>
        <xsl:apply-templates select="@*|node()"/>
      </xsl:element>
  </xsl:template>
  
        
    
</xsl:stylesheet>
