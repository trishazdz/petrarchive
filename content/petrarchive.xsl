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
    
    <xsl:param name="includeToolbox" select="true()"/>
    <xsl:param name="pbNote" select="''"/>
    
    <xsl:param name="customCSS.norm" select="concat($filePrefix,'/css/custom_norm.css')"/>
    <xsl:param name="customCSS" select="concat($filePrefix,'/css/custom.css')"/>
    
    <xsl:template match="tei:g" priority="99">
        
        <xsl:choose>
            <xsl:when test="id(substring-after(@ref,'#'))/tei:mapping[@type = 'visual']">
                <xsl:value-of select="normalize-space(id(substring-after(@ref,'#'))/tei:mapping[@type = 'visual'])"/>
            </xsl:when>
            <xsl:otherwise>
                <xsl:value-of select="concat('[',normalize-space(id(substring-after(@ref,'#'))/tei:charName),']')"/>
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
        <div style="float:left; margin-right:2em;">
            <xsl:apply-templates select="ancestor::tei:lg[@type = 'sestina']//tei:l[preceding::tei:cb[@n = '2-of-2'] = $mycb]" mode="process"/>
        </div>
    </xsl:template>
    
    <xsl:template match="tei:lg[@type = 'sestina']//tei:l[preceding::tei:cb]"/>
    <xsl:template match="tei:lg[@type = 'sestian']//tei:lg">
        <xsl:apply-templates/>
    </xsl:template>
    
    <xsl:template match="tei:lg[@type = 'sestina']//tei:l[preceding::tei:cb]" mode="process">
            <xsl:element name="{local-name()}">
                <xsl:call-template name="addID"/>
                <xsl:apply-templates select="@*|node()"/>
            </xsl:element>
    </xsl:template>
    
    <xsl:template name="htmlHead">
        <head>
            <script type="text/javascript" src="//use.typekit.net/ctk5ksw.js"></script>
            <script type="text/javascript">try{Typekit.load();}catch(e){}</script>
            <meta charset="UTF-8"/>
            <link id="maincss" rel="stylesheet" type="text/css" href="{$teibpCSS}"/>
            <link id="customcss" rel="stylesheet" type="text/css" href="{$customCSS}"/>
            <script type="text/javascript" src="{$jqueryJS}"></script>
            <script type="text/javascript" src="{$jqueryBlockUIJS}"></script>
            <script type="text/javascript" src="{$teibpJS}"></script>
            <script type="text/javascript">
                $(document).ready(function() {
                $("html > head > title").text($("TEI > teiHeader > fileDesc > titleStmt > title:first").text());
                $.unblockUI();	
                });
                
                function switchCustomCSS(theme) {
                document.getElementById('customcss').href=theme.options[theme.selectedIndex].value;
                }
            </script>
            <xsl:call-template name="rendition2style"/>
            <title><!-- don't leave empty. --></title>
            <xsl:if test="$includeAnalytics = true()">
                <xsl:call-template name="analytics"/>
            </xsl:if>
        </head>
    </xsl:template>
    
    <!-- Petrarchive Toolbox -->
    <xsl:template name="teibpToolbox">
        <div id="teibpToolbox">
            <div>
                <h3 style="display:inline;">text view:</h3>
                <select style="display:inline;" id="themeBox" onchange="switchCustomCSS(this);">
                    <option value="{$customCSS}" >diplomatic transcription</option>
                    <option value="{$customCSS.norm}">edited text</option>
                </select>			
            </div>
        </div>
    </xsl:template>
    
    <xsl:variable name="htmlFooter">
        <footer> © 2013. This document is part of the <cite>Petr<span style="font-style:normal;">archive</span></cite>.<br />
            By H. Wayne Storey, John A. Walsh, Isabella Magni, and Allison M. McCormack. <br /><a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/3.0/deed.en_US"><img alt="Creative Commons License" style="border-width:0" src="http://i.creativecommons.org/l/by-nc-sa/3.0/80x15.png" /></a>&#x00a0;<span xmlns:dct="http://purl.org/dc/terms/" property="dct:title">Petrarchive</span> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/3.0/deed.en_US">Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License</a>. <br />Powered by <a href="{$teibpHome}">TEI Boilerplate</a>. 
        </footer>
    </xsl:variable>
        
    
</xsl:stylesheet>